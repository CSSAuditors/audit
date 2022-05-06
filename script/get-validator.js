const helpers = require('./helpers')
const calc = require('./calc')

const getReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const errorsFile = `${folder}/errors.json`

    if(!helpers.fileExists(errorsFile)) {
      resolve(false)
    }

    const errorsRaw = await helpers.getFile(errorsFile)
    const errorsData = JSON.parse(errorsRaw)

    if(!silent) {
      console.log('')
      console.log('ERRORS')
    }

    const errorsKeys = Object.keys(errorsData)
    const errorsReturn = []

    if(errorsKeys.length) {
      errorsKeys.map(errorsKey => {
        const errorsValue = Object.values(errorsData[errorsKey])
        errorsReturn.push({
          key: errorsKey,
          value: errorsValue.length
        })
        if(!silent) {
          console.log(`📉[${site.title}] Number of ${errorsKey} errors: `, errorsValue.length)
        }
      })
    }

    const warningsFile = `${folder}/warnings.json`

    if(!helpers.fileExists(warningsFile)) {
      resolve(false)
    }

    const warningsRaw = await helpers.getFile(warningsFile)
    const warningsData = JSON.parse(warningsRaw)

    if(!silent) {
      console.log('')
      console.log('WARNINGS')
    }

    const warningsKeys = Object.keys(warningsData)
    const warningsReturn = []

    if(warningsKeys.length) {
      warningsKeys.map(warningsKey => {
        const warningsValue = Object.values(warningsData[warningsKey])
        warningsReturn.push({
          key: warningsKey,
          value: warningsValue.length
        })
        if(!silent) {
          console.log(`📉[${site.title}] Number of ${warningsKey} warnings: `, warningsValue.length)
        }
      })
    }

    resolve({
      errors: errorsReturn,
      error_types_count: errorsReturn.length,
      errors_count: calc.getOverall(errorsReturn, 'value'),
      warnings: warningsReturn,
      warnings_count: calc.getOverall(warningsReturn, 'value'),
      warning_types_count: warningsReturn.length,
      site: site
    })
  })
}

const report = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const validatorFile = `${root}/site/_data/${name}-validator.json`

  // if(!helpers.fileExists(validatorFile) && sites.list) {
    const validatorData = {
      list: []
    }

    for(const site of sites.list) {
      validatorData.list.push({...await getReport(site, silent)})
    }

    const flatList = validatorData.list.flat()

    let errorList = []
    let warningList = []

    flatList.forEach(item => {
      if(item.errors) {
        item.errors.forEach(error => {
          if(errorList.indexOf(error.key) === -1) {
            errorList.push(error.key)
          }
        })
      }

      if(item.warnings) {
        item.warnings.forEach(warning => {
          if(warningList.indexOf(warning.key) === -1) {
            warningList.push(warning.key)
          }
        })
      }
    })

    validatorData.errorList = errorList
    validatorData.warningList = warningList

    const maxErrorTypes = calc.getMax(validatorData.list, 'errors')
    const minErrorTypes = calc.getMin(validatorData.list, 'errors')
    const minErrorTypesList = calc.getMins(validatorData.list, 'errors')
    const avgErrorTypes = calc.getAverage(validatorData.list, 'error_types_count')
    const avgErrorTypes2 = calc.getMedian(validatorData.list, 'error_types_count')
    const maxErrors = calc.getMax(validatorData.list, 'errors_count')
    const minErrors = calc.getMin(validatorData.list, 'errors_count')
    const minErrorsList = calc.getMins(validatorData.list, 'errors_count')
    const avgErrors = calc.getAverage(validatorData.list, 'errors_count')
    const avgErrors2 = calc.getMedian(validatorData.list, 'errors_count')

    validatorData.maxErrorTypes = {
      site: maxErrorTypes.site,
      errors: maxErrorTypes.errors
    }

    validatorData.minErrorTypes = {
      site: minErrorTypes.site,
      errors: minErrorTypes.errors
    }
    validatorData.minErrorTypesList = minErrorTypesList
    validatorData.avgErrorTypes = `${avgErrorTypes}`
    validatorData.avgErrorTypes2 = `${avgErrorTypes2}`
    validatorData.maxErrors = {
      site: maxErrors.site,
      errors_count: maxErrors.errors_count
    }
    validatorData.minErrors = {
      site: minErrors.site,
      errors_count: minErrors.errors_count
    }
    validatorData.minErrorsList = minErrorsList
    validatorData.avgErrors = `${avgErrors}`
    validatorData.avgErrors2 = `${avgErrors2}`

    const maxWarningTypes = calc.getMax(validatorData.list, 'warnings')
    const minWarningTypes = calc.getMin(validatorData.list, 'warnings')
    const minWarningTypesList = calc.getMins(validatorData.list, 'warnings')
    const avgWarningTypes = calc.getAverage(validatorData.list, 'warning_types_count')
    const avgWarningTypes2 = calc.getMedian(validatorData.list, 'warning_types_count')
    const maxWarnings = calc.getMax(validatorData.list, 'warnings_count')
    const minWarnings = calc.getMin(validatorData.list, 'warnings_count')
    const minWarningsList = calc.getMins(validatorData.list, 'warnings_count')
    const avgWarnings = calc.getAverage(validatorData.list, 'warnings_count')
    const avgWarnings2 = calc.getMedian(validatorData.list, 'warnings_count')

    validatorData.maxWarningTypes = {
      site: maxWarningTypes.site,
      warnings: maxWarningTypes.warnings
    }

    validatorData.minWarningTypes = {
      site: minWarningTypes.site,
      warnings: minWarningTypes.warnings
    }
    validatorData.minWarningTypesList = minWarningTypesList
    validatorData.avgWarningTypes = `${avgWarningTypes}`
    validatorData.avgWarningTypes2 = `${avgWarningTypes2}`
    validatorData.maxWarnings = {
      site: maxWarnings.site,
      warnings_count: maxWarnings.warnings_count
    }
    validatorData.minWarnings = {
      site: minWarnings.site,
      warnings_count: minWarnings.warnings_count
    }
    validatorData.minWarningsList = minWarningsList
    validatorData.avgWarnings = `${avgWarnings}`
    validatorData.avgWarnings2 = `${avgWarnings2}`

    helpers.saveFile(validatorFile, validatorData, true)

    if(!silent) {
      console.log(`✅ Validator data saved at ${validatorFile}`)
    }
  // } else {
  //   if(!silent) {
  //     console.log(`✅ Validator data exists at ${validatorFile}`)
  //   }
  // }

  return true
}

module.exports = {
  report
}

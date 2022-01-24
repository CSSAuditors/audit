const helpers = require('./helpers')
const { getMax, getMin, getAverage, getOverall } = require('./calc')

const getReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const errorsFile = `${folder}/errors.json`

    if(!helpers.fileExists(errorsFile)) {
      return false
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
      return false
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
      errors_count: getOverall(errorsReturn, 'value'),
      warnings: warningsReturn,
      warnings_count: getOverall(warningsReturn, 'value'),
      warning_types_count: warningsReturn.length,
      site: site
    })
  })
}

const report = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const validatorFile = `${root}/site/_data/${name}-validator.json`

  if(!helpers.fileExists(validatorFile) && sites.list) {
    const validatorData = {
      list: []
    }

    for(const site of sites.list) {
      validatorData.list.push({...await getReport(site, silent)})
    }

    if(!silent) {
      console.log('')
      console.log('❌ ERRORS')
    }

    const maxErrorTypes = getMax(validatorData.list, 'errors')
    const minErrorTypes = getMin(validatorData.list, 'errors')
    const avgErrorTypes = getAverage(validatorData.list, 'error_types_count')
    const maxErrors = getMax(validatorData.list, 'errors_count')
    const minErrors = getMin(validatorData.list, 'errors_count')
    const avgErrors = getAverage(validatorData.list, 'errors_count')

    validatorData.maxErrorTypes = {
      site: maxErrorTypes.site,
      errors: maxErrorTypes.errors
    }

    validatorData.minErrorTypes = {
      site: minErrorTypes.site,
      errors: minErrorTypes.errors
    }
    validatorData.avgErrorTypes = `${avgErrorTypes}`
    validatorData.maxErrors = {
      site: maxErrors.site,
      errors_count: maxErrors.errors_count
    }
    validatorData.minErrors = {
      site: minErrors.site,
      errors_count: minErrors.errors_count
    }
    validatorData.avgErrors = `${avgErrors}`

    if(!silent) {
      console.log('')
      console.log('⚠️ WARNINGS')
    }

    const maxWarningTypes = getMax(validatorData.list, 'warnings')
    const minWarningTypes = getMin(validatorData.list, 'warnings')
    const avgWarningTypes = getAverage(validatorData.list, 'warning_types_count')
    const maxWarnings = getMax(validatorData.list, 'warnings_count')
    const minWarnings = getMin(validatorData.list, 'warnings_count')
    const avgWarnings = getAverage(validatorData.list, 'warnings_count')

    validatorData.maxWarningTypes = {
      site: maxWarningTypes.site,
      warnings: maxWarningTypes.warnings
    }

    validatorData.minWarningTypes = {
      site: minWarningTypes.site,
      warnings: minWarningTypes.warnings
    }

    validatorData.avgWarningTypes = `${avgWarningTypes}`
    validatorData.maxWarnings = {
      site: maxWarnings.site,
      warnings_count: maxWarnings.warnings_count
    }

    validatorData.minWarnings = {
      site: minWarnings.site,
      warnings_count: minWarnings.warnings_count
    }

    validatorData.avgWarnings = `${avgWarnings}`

    helpers.saveFile(validatorFile, validatorData, true)

    if(!silent) {
      console.log(`✅ Validator data saved at ${validatorFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Validator data exists at ${validatorFile}`)
    }
  }

  return true
}

module.exports = {
  report
}

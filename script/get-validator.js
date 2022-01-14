const helpers = require('./helpers')
const { getMax, getMin, getAverage, getOverall } = require('./calc')

const validatorReport = async (site, silent) => {
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
    })
  })
}

const validatorsReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{validator: await validatorReport(site, true)}, site: site})
  }

  console.log('')
  console.log('ERRORS')

  const maxErrorTypes = getMax(arr, 'validator', 'errors')
  const minErrorTypes = getMin(arr, 'validator', 'errors')
  const avgErrorTypes = getAverage(arr, 'validator', 'error_types_count')
  const maxErrors = getMax(arr, 'validator', 'errors_count')
  const minErrors = getMin(arr, 'validator', 'errors_count')
  const avgErrors = getAverage(arr, 'validator', 'errors_count')

  console.log(`📊 Site with most error types: ${maxErrorTypes.site.title} [${maxErrorTypes['validator']['errors'].length}]`)
  console.log(`📊 Site with least error types: ${minErrorTypes.site.title} [${minErrorTypes['validator']['errors'].length}]`)
  console.log(`📊 Average error types count: ${avgErrorTypes}`)
  console.log(`📊 Site with most errors: ${maxErrors.site.title} [${maxErrors['validator']['errors_count']}]`)
  console.log(`📊 Site with least errors: ${minErrors.site.title} [${minErrors['validator']['errors_count']}]`)
  console.log(`📊 Average errors count: ${avgErrors}`)

  console.log('')
  console.log('WARNINGS')

  const maxWarningTypes = getMax(arr, 'validator', 'warnings')
  const minWarningTypes = getMin(arr, 'validator', 'warnings')
  const avgWarningTypes = getAverage(arr, 'validator', 'warning_types_count')
  const maxWarnings = getMax(arr, 'validator', 'warnings_count')
  const minWarnings = getMin(arr, 'validator', 'warnings_count')
  const avgWarnings = getAverage(arr, 'validator', 'warnings_count')

  console.log(`📊 Site with most warning types: ${maxWarningTypes.site.title} [${maxWarningTypes['validator']['warnings'].length}]`)
  console.log(`📊 Site with least warning types: ${minWarningTypes.site.title} [${minWarningTypes['validator']['warnings'].length}]`)
  console.log(`📊 Average warning types count: ${avgWarningTypes}`)
  console.log(`📊 Site with most warnings: ${maxWarnings.site.title} [${maxWarnings['validator']['warnings_count']}]`)
  console.log(`📊 Site with least warnings: ${minWarnings.site.title} [${minWarnings['validator']['warnings_count']}]`)
  console.log(`📊 Average warnings count: ${avgWarnings}`)

  return {
    'maxErrorTypes': maxErrorTypes,
    'minErrorTypes': minErrorTypes,
    'avgErrorTypes': avgErrorTypes,
    'maxErrors': maxErrors,
    'minErrors': minErrors,
    'avgErrors': avgErrors,
    'maxWarningTypes': maxWarningTypes,
    'minWarningTypes': minWarningTypes,
    'avgWarningTypes': avgWarningTypes,
    'maxWarnings': maxWarnings,
    'minWarnings': minWarnings,
    'avgWarnings': avgWarnings,
  }
}

module.exports = {
  validatorReport,
  validatorsReport
}

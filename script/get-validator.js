const files = require('./files')

const validator = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const errorsFile = `${folder}/errors.json`

    if(!files.fileExists(errorsFile)) {
      return false
    }

    const errorsRaw = await files.getFile(errorsFile)
    const errorsData = JSON.parse(errorsRaw)

    console.log('')
    console.log('ERRORS')

    const errorsKeys = Object.keys(errorsData)

    if(errorsKeys.length) {
      errorsKeys.map(errorsKey => {
        const errorsValue = Object.values(errorsData[errorsKey])
        console.log(`📉[${site.title}] Number of ${errorsKey} errors: `, errorsValue.length)
      })
    }

    const warningsFile = `${folder}/warnings.json`

    if(!files.fileExists(warningsFile)) {
      return false
    }

    const warningsRaw = await files.getFile(warningsFile)
    const warningsData = JSON.parse(warningsRaw)

    console.log('')
    console.log('WARNINGS')

    const warningsKeys = Object.keys(warningsData)

    if(warningsKeys.length) {
      warningsKeys.map(warningsKey => {
        const warningsValue = Object.values(warningsData[warningsKey])
        console.log(`📉[${site.title}] Number of ${warningsKey} warnings: `, warningsValue.length)
      })
    }

    resolve()
  })
}

module.exports = validator

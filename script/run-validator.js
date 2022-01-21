const helpers = require('./helpers.js')
const validator = require('css-validator')

const validate = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const errorsFile = `${folder}/errors.json`
    const warningsFile = `${folder}/warnings.json`

    if(!helpers.fileExists(errorsFile) || !helpers.fileExists(warningsFile)) {
      const cssFile = `${folder}/style-clean.css`
      // const cssFile = `${folder}/style-dirty.css`

      if(!helpers.fileExists(cssFile)) {
        return false
      }

      const cssString = await helpers.getFile(cssFile)

      validator(cssString, (err, data) => {
        let errorData = {}

        data.errors.forEach(error => {
          const t = error.type || error.errortype

          if(!(t in errorData)) {
            errorData[t] = []
          }


          errorData[t].push(error)
        })

        let warningData = {}

        data.warnings.forEach(warning => {
          const t = warning.type || warning.warningtype

          if(!(t in warningData)) {
            warningData[t] = []
          }

          warningData[t].push(warning)
        })

        helpers.saveFile(errorsFile, errorData, true)
        helpers.saveFile(warningsFile, warningData, true)

        console.log(`✅ Errors and warnings helpers created in ${folder}.`)
      })
    } else {
      console.log(`❌ Errors file: ${errorsFile}`)
      console.log(`⚠️  Warnings file: ${warningsFile}`)
    }


    resolve()
  })
}

module.exports = validate

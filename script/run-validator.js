const files = require('./files.js')
const validator = require('css-validator')

const validate = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const errorsFile = `${folder}/errors.json`
    const warningsFile = `${folder}/warnings.json`

    if(!files.fileExists(errorsFile) || !files.fileExists(warningsFile)) {
      const cssFile = `${folder}/style-clean.css`
      // const cssFile = `${folder}/style-dirty.css`

      if(!files.fileExists(cssFile)) {
        return false
      }

      const cssString = await files.getFile(cssFile)

      validator(cssString, (err, data) => {
        let errorData = {}

        data.errors.forEach(error => {
          const t = error.type || error.errortype

          if(t === 'noexistence-typo') {
            // console.log(error)
          }

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

        console.log(errorData);
        console.log(warningData);

        files.saveFile(errorsFile, errorData, true)
        files.saveFile(warningsFile, warningData, true)

        console.log(`✅ Errors and warnings files created in ${folder}.`)
      })
    } else {
      console.log(`❌ Errors file: ${errorsFile}`)
      console.log(`⚠️  Warnings file: ${warningsFile}`)
    }


    resolve()
  })
}

module.exports = validate

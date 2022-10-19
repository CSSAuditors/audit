const helpers = require('./helpers.js')
const validator = require('css-validator')

const validate = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const errorsFile = `${folder}/errors.json`
    const warningsFile = `${folder}/warnings.json`


    if(!helpers.fileExists(errorsFile) || !helpers.fileExists(warningsFile)) {
      // const cssFile = `${folder}/style-clean.css`
      const cssFile = `${folder}/style-dirty.css`

      if(helpers.fileExists(cssFile)) {
        const cssString = await helpers.getFile(cssFile)

        validator({
          text: cssString,
          profile: 'css3svg'
        }, (err, data) => {
          let errorData = {}

          if(data && "errors" in data) {
            data.errors.forEach(error => {
              if(error.type) {
                console.log(error.type);
                if(!(error.type in errorData)) {
                  errorData[error.type] = []
                }

                errorData[error.type].push(error)
              }
            })
          }

          let warningData = {}

          if(data && "warnings" in data) {
            data.warnings.forEach(warning => {
              if(warning.type) {
                if(!(warning.type in warningData)) {
                  warningData[warning.type] = []
                }

                warningData[warning.type].push(warning)
              }
            })
          }

          helpers.saveFile(errorsFile, errorData, true)
          helpers.saveFile(warningsFile, warningData, true)

          if(!silent) {
            console.log(`✅ Errors and warnings helpers created in ${folder}.`)
          }
        })
      }
    } else {
      if(!silent) {
        console.log(`❌ Errors file: ${errorsFile}`)
        console.log(`⚠️  Warnings file: ${warningsFile}`)
      }
    }

    resolve()
  })
}

module.exports = validate

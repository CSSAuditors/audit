const helpers = require('./helpers.js')
const analyzer = require('@projectwallace/css-analyzer')

const analyze = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(helpers.fileExists(cssFileClean)) {
      const cssString = await helpers.getFile(cssFileClean)

      const analyzerFile = `${folder}/analyzer.json`

      if(!helpers.fileExists(analyzerFile)) {
        analyzer(`${cssString}`)
          .then(result => {
            helpers.saveFile(analyzerFile, result, true)

            if(!silent) {
              console.log(`✅ Analyzer file created in ${folder}`)
            }
          })
          .catch(error => console.error(error))
      } else {
        if(!silent) {
          console.log(`🔍 Analyzer file: ${analyzerFile}`)
        }
      }
    }

    resolve()
  })
}

module.exports = analyze

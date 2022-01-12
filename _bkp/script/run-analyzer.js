const files = require('./files.js')
const analyzer = require('@projectwallace/css-analyzer')

const analyze = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(!files.fileExists(cssFileClean)) {
      return false
    }

    const cssString = await files.getFile(cssFileClean)

    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      analyzer(`${cssString}`)
        .then(result => {
          files.saveFile(analyzerFile, result, true)

          console.log(`✅ Analyzer file created in ${folder}`)
        })
        .catch(error => console.error(error))
    } else {
      console.log(`🔍 Analyzer file: ${analyzerFile}`)
    }

    resolve()
  })
}

module.exports = analyze

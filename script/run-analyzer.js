const helpers = require('./helpers.js')
const { analyze } = require('@projectwallace/css-analyzer')

const analyzer = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(helpers.fileExists(cssFileClean)) {
      const cssString = await helpers.getFile(cssFileClean)

      const analyzerFile = `${folder}/analyzer.json`

      if(!helpers.fileExists(analyzerFile)) {
        const result = analyze(`${cssString}`)

        console.log(result);

        delete result.rules.selectors.items
        delete result.rules.declarations.items
        delete result.rules.sizes.items
        delete result.selectors.specificity.items
        delete result.selectors.complexity.items

        helpers.saveFile(analyzerFile, result, true)

        if(!silent) {
          console.log(`✅ Analyzer file created in ${folder}`)
        }
      } else {
        if(!silent) {
          console.log(`🔍 Analyzer file: ${analyzerFile}`)
        }
      }
    }

    resolve()
  })
}

module.exports = analyzer

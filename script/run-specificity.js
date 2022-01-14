const helpers = require('./helpers.js')
const specificityGraph = require('specificity-graph')

const specs = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(!helpers.fileExists(cssFileClean)) {
      return false
    }

    const cssString = await helpers.getFile(cssFileClean)

    const specificityFolder = `${folder}/specificity`

    if(!helpers.directoryExists(specificityFolder)) {
      helpers.makeDirectory(specificityFolder)
    }

    const specificityFile = `${specificityFolder}/specificity.json`

    if(!helpers.fileExists(specificityFile)) {
      specificityGraph(specificityFolder, cssString, (directory) => {
        directory.forEach(dir => {
          if(dir) {
            console.log(`Specificity graph helpers created in ${dir}.`)
          }
        })
      })
    } else {
      console.log(`📈 Specificity graph file: ${specificityFile}`)
    }

    resolve()
  })
}

module.exports = specs

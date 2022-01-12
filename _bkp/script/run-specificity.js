const files = require('./files.js')
const specificityGraph = require('specificity-graph')

const specs = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(!files.fileExists(cssFileClean)) {
      return false
    }

    const cssString = await files.getFile(cssFileClean)

    const specificityFolder = `${folder}/specificity`

    if(!files.directoryExists(specificityFolder)) {
      files.makeDirectory(specificityFolder)
    }

    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      specificityGraph(specificityFolder, cssString, (directory) => {
        directory.forEach(dir => {
          if(dir) {
            console.log(`Specificity graph files created in ${dir}.`)
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

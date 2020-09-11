const files = require('./files')

const specificity = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const specificityFolder = `${folder}/specificity`
    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      return false
    }

    const specificityRaw = await files.getFile(specificityFile)
    const specificityData = JSON.parse(specificityRaw)

    console.log('')
    console.log('SPECIFICITY')
    console.log(`📉[${site.title}] Max specificity: `, Math.max.apply(Math, specificityData.map(spec => spec.specificity)))

    resolve()
  })
}

module.exports = specificity

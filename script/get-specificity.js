const files = require('./files')
const { getMax, getMin } = require('./calc')

const specificityReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const specificityFolder = `${folder}/specificity`
    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      return false
    }

    const specificityRaw = await files.getFile(specificityFile)
    const specificityData = JSON.parse(specificityRaw)

    const maxSpecificity = getMax(specificityData, 'specificity')
    const minSpecificity = getMin(specificityData, 'specificity')
    const avgSpecificity = getAverage(specificityData, 'specificity')

    console.log('')
    console.log('SPECIFICITY')
    console.log(`📉[${site.title}] Max specificity: `, maxSpecificity.specificity)
    console.log(`📉[${site.title}] Min specificity: `, minSpecificity.specificity)

    resolve({
      maxSpecificity: maxSpecificity,
      minSpecificity: minSpecificity,
    })
  })
}

const specificitiesReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{specificity: await specificityReport(site, true)}, site: site})
  }

  // console.log(arr)
}

module.exports = {
  specificityReport,
  specificitiesReport
}

const files = require('./files')
const { getMax, getMin } = require('./calc')

const specificityReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const specificityFolder = `${folder}/specificity`
    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      return false
    }

    const specificityRaw = await files.getFile(specificityFile)
    const specificityData = JSON.parse(specificityRaw)

    const maxSpecificity = getMax(specificityData, 'specificity', false, true)
    const minSpecificity = getMin(specificityData, 'specificity', false, true)

    if(!silent) {
      console.log('')
      console.log('SPECIFICITY')
      console.log(`📉[${site.title}] Max specificity: `, maxSpecificity.specificity)
      console.log(`📉[${site.title}] Min specificity: `, minSpecificity.specificity)
    }

    resolve({
      maxSpecificity: maxSpecificity.specificity,
      minSpecificity: minSpecificity.specificity,
    })
  })
}

const specificitiesReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{specificity: await specificityReport(site, true)}, site: site})
  }

  console.log('')
  console.log('SPECIFICITIES')

  const maxSpecificity = getMax(arr, 'specificity', 'maxSpecificity', true)
  const minSpecificity = getMin(arr, 'specificity', 'minSpecificity', true)

  console.log(`📊 Site with highest specificity: ${maxSpecificity.site.title} [${maxSpecificity['specificity']['maxSpecificity']}]`)
  console.log(`📊 Site with lowest specificity: ${minSpecificity.site.title} [${minSpecificity['specificity']['minSpecificity']}]`)

  return {
    maxSpecificity: maxSpecificity,
    minSpecificity: minSpecificity,
  }
}

module.exports = {
  specificityReport,
  specificitiesReport
}

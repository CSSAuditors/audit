const helpers = require('./helpers')
const calc = require('./calc')

const getReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const specificityFolder = `${folder}/specificity`
    const specificityFile = `${specificityFolder}/specificity.json`

    if(!helpers.fileExists(specificityFile)) {
      resolve(false)
    }

    const specificityRaw = await helpers.getFile(specificityFile)
    const specificityData = JSON.parse(specificityRaw)

    const maxSpecificity = calc.getMax(specificityData, 'specificity')
    const minSpecificity = calc.getMin(specificityData, 'specificity', false, true)

    if(!silent) {
      console.log('')
      console.log('SPECIFICITY')
      console.log(`📉[${site.title}] Max specificity: `, maxSpecificity.specificity)
      console.log(`📉[${site.title}] Min specificity: `, minSpecificity.specificity)
    }

    resolve({
      maxSpecificity: maxSpecificity.specificity,
      maxSelector: maxSpecificity.selectors,
      minSpecificity: minSpecificity.specificity,
      minSelector: minSpecificity.selectors,
      site: site
    })
  })
}

const report = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const specificityFile = `${root}/site/_data/${name}-specificity.json`

  if(!helpers.fileExists(specificityFile) && sites.list) {
    const specificityData = {
      list: []
    }

    for(const site of sites.list) {
      specificityData.list.push({...await getReport(site, silent)})
    }

    specificityData.maxSpecificity = calc.getMax(specificityData.list, 'maxSpecificity')
    specificityData.minSpecificity = calc.getMin(specificityData.list, 'minSpecificity')

    helpers.saveFile(specificityFile, specificityData, true)

    if(!silent) {
      console.log(`✅ Specificity data saved at ${specificityFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Specificity data exists at ${specificityFile}`)
    }
  }

  return true
}

module.exports = {
  report
}

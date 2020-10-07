const files = require('./files')
const { getPercent } = require('./calc')

const wappalyzerReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const wappalyzerFile = `${folder}/wappalyzer.json`

    if(!files.fileExists(wappalyzerFile)) {
      return false
    }

    const wappalyzerRaw = await files.getFile(wappalyzerFile)
    const wappalyzerData = JSON.parse(wappalyzerRaw)

    const frameworks = wappalyzerData.technologies.filter(tech => tech.categories.find(category => category.slug === 'ui-frameworks'))

    const frameworksUsed = frameworks.length > 0 ? frameworks.map(framework => framework.name).join(', ') : 'None'


    if(!silent) {
      console.log('')
      console.log('WAPPALYZER')
      console.log(`📉[${site.title}] UI frameworks:`, frameworksUsed)
    }

    resolve(frameworksUsed)
  })
}

const wappalyzersReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{frameworks: await wappalyzerReport(site, true)}, site: site})
  }

  console.log('')
  console.log('WAPPALYZERS')

  const frameworks = arr.filter(item => item.frameworks !== 'None')

  frameworks.forEach(framework => {
    console.log(`📊 ${framework.site.title} uses these UI frameworks: ${framework.frameworks}`)
  })

  console.log(`📊 Percent of sites that uses UI frameworks: ${getPercent(frameworks.length, arr.length)}`)

  return {
    frameworks: frameworks
  }
}

module.exports = {
  wappalyzerReport,
  wappalyzersReport
}

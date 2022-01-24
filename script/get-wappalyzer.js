const helpers = require('./helpers')
const calc = require('./calc')

const wappalyzerReportSync = (site) => {
  const folder = helpers.getFolder(site)
  const wappalyzerFile = `${folder}/wappalyzer.json`

  if (!helpers.fileExists(wappalyzerFile)) {
    return false
  }

  const wappalyzerRaw = helpers.getFileSync(wappalyzerFile)
  const wappalyzerData = JSON.parse(wappalyzerRaw)

  const frameworks = wappalyzerData.technologies.filter(tech => tech.categories.find(category => category.slug === 'ui-frameworks'))

  const frameworksUsed = {
    frameworks: frameworks.length > 0 ? frameworks.map(framework => framework.name).join(', ') : 'None',
    site: site
  }

  return frameworksUsed
}

const report = (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const wappalyzerFile = `${root}/site/_data/${name}-wappalyzer.json`

  if(!helpers.fileExists(wappalyzerFile) && sites.list) {
    const wappalyzerData = []

    for (const site of sites.list) {
      wappalyzerData.push({
        ...wappalyzerReportSync(site)
      })
    }

    const frameworksData = wappalyzerData.filter(item => item.frameworks !== 'None')

    if(!silent) {
      console.log(`✅ Wappalyzer data saved at ${wappalyzerFile}`)
    }

    helpers.saveFile(wappalyzerFile, frameworksData, true)
  } else {
    if(!silent) {
      console.log(`✅ Wappalyzer data exists at ${wappalyzerFile}`)
    }
  }

  return true
}

module.exports = {
  report
}

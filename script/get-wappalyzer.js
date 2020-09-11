const files = require('./files')

const wappalyzer = async (site) => {
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

    console.log('')
    console.log('WAPPALYZER')
    console.log(`📉[${site.title}] UI frameworks:`, frameworksUsed)

    resolve()
  })
}

module.exports = wappalyzer

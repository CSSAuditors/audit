const helpers = require('./helpers')
const { wrapLines } = require('./template')
const { getPercent } = require('./calc')

const wappalyzerReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const wappalyzerFile = `${folder}/wappalyzer.json`

    if(!helpers.fileExists(wappalyzerFile)) {
      return false
    }

    const wappalyzerRaw = await helpers.getFile(wappalyzerFile)
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

const wappalyzersReport = async (sites, silent) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{frameworks: await wappalyzerReport(site, silent)}, site: site})
  }

  if(!silent) {
    console.log('')
    console.log('WAPPALYZERS')
  }

  const frameworks = arr.filter(item => item.frameworks !== 'None')

  if(!silent) {
    frameworks.forEach(framework => {
      console.log(`📊 ${framework.site.title} uses these UI frameworks: ${framework.frameworks}`)
    })

    console.log(`📊 Percent of sites that uses UI frameworks: ${getPercent(frameworks.length, arr.length)}`)
  }

  return {
    frameworks: frameworks
  }
}

const wappalyzerReportSync = (site, silent) => {
  const folder = helpers.getFolder(site)
  const wappalyzerFile = `${folder}/wappalyzer.json`

  if(!helpers.fileExists(wappalyzerFile)) {
    return false
  }

  const wappalyzerRaw = helpers.getFileSync(wappalyzerFile)
  const wappalyzerData = JSON.parse(wappalyzerRaw)

  const frameworks = wappalyzerData.technologies.filter(tech => tech.categories.find(category => category.slug === 'ui-frameworks'))

  const frameworksUsed = frameworks.length > 0 ? frameworks.map(framework => framework.name).join(', ') : 'None'

  if(!silent) {
    console.log('')
    console.log('WAPPALYZER')
    console.log(`📉[${site.title}] UI frameworks:`, frameworksUsed)
  }

  return frameworksUsed
}

const wappalyzersReportSync = (sites, silent) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{frameworks: wappalyzerReportSync(site, silent)}, site: site})
  }

  if(!silent) {
    console.log('')
    console.log('WAPPALYZERS')
  }

  const frameworks = arr.filter(item => item.frameworks !== 'None')

  if(!silent) {
    frameworks.forEach(framework => {
      console.log(`📊 ${framework.site.title} uses these UI frameworks: ${framework.frameworks}`)
    })

    console.log(`📊 Percent of sites that uses UI frameworks: ${getPercent(frameworks.length, arr.length)}`)
  }

  return {
    frameworks: frameworks
  }
}

const generateWappalyzersReport = (sites, fresh) => {
  const folder = helpers.getFolder(sites[0], true)
  const wappalyzerFile = `${folder}/wappalyzer.json`
  let wappalyzerData

  if(helpers.fileExists(wappalyzerFile)) {
    wappalyzerData = JSON.parse(helpers.getFileSync(wappalyzerFile))
  }

  if(fresh || !wappalyzerData) {
    const report = wappalyzersReportSync(sites, true)

    const htmlFrameworks = report.frameworks.map(framework => `<td>${framework.site.title}</td><td>${framework.frameworks}</td>`).join('\n')

    wappalyzerData = {
      $htmlWappalyzer: `<table><tr><th>Site</th><th>UI Framework</th></tr>${wrapLines(htmlFrameworks, '\n', 'tr', '\n')}</table>`,
    }

    helpers.saveFile(wappalyzerFile, wappalyzerData, true)
  }

  return wappalyzerData
}

module.exports = {
  wappalyzerReport,
  wappalyzersReport,
  wappalyzerReportSync,
  wappalyzersReportSync,
  generateWappalyzersReport
}

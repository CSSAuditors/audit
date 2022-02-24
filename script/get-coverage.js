const helpers = require('./helpers')
const calc = require('./calc')

const getReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const coverageFile = `${folder}/coverage.json`

    if(!helpers.fileExists(coverageFile)) {
      resolve(false)
    }

    const coverageRaw = await helpers.getFile(coverageFile)
    const coverageData = JSON.parse(coverageRaw)

    let totalBytes = 0
    let usedBytes = 0

    for (const entry of coverageData) {
      totalBytes += entry.text.length

      if(Object.keys(entry.ranges).length === 0) {
        usedBytes += entry.text.length
      } else {
        for (const range of entry.ranges) {
          usedBytes += range.end - range.start - 1
        }
      }
    }

    const usage = usedBytes && totalBytes ? Math.round(((usedBytes / totalBytes * 100) + Number.EPSILON) * 100) / 100 : 0

    if(!silent) {
      console.log('')
      console.log('COVERAGE')
      console.log(`📉[${site.title}] Percent of bytes used: ${usage}`)
    }

    resolve({
      usage: usage,
      site: site
    })
  })
}

const report = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const coverageFile = `${root}/site/_data/${name}-coverage.json`

  if(!helpers.fileExists(coverageFile) && sites.list) {
    const coverageData = {
      list: []
    }

    for(const site of sites.list) {
      if(!site.css) {
        coverageData.list.push({...await getReport(site, silent)})
      }
    }

    if(!coverageData.list.length) {
      return false
    }

    coverageData.maxCoverage = calc.getMax(coverageData.list, 'usage')
    coverageData.minCoverage = calc.getMin(coverageData.list, 'usage')
    coverageData.avgCoverage = calc.getAverage(coverageData.list, 'usage')

    helpers.saveFile(coverageFile, coverageData, true)

    if(!silent) {
      console.log(`✅ Coverage data saved at ${coverageFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Coverage data exists at ${coverageFile}`)
    }
  }

  return true
}

module.exports = {
  report
}

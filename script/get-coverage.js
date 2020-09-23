const files = require('./files')
const { getMax, getMin, getAverage, getRound } = require('./calc')

const coverageReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const coverageFile = `${folder}/coverage.json`

    if(!files.fileExists(coverageFile)) {
      return false
    }

    const coverageRaw = await files.getFile(coverageFile)
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

    const usage = Math.round(((usedBytes / totalBytes * 100) + Number.EPSILON) * 100) / 100

    if(!silent) {
      console.log('')
      console.log('COVERAGE')
      console.log(`📉[${site.title}] Percent of bytes used: ${usage}`)
    }

    resolve(usage)
  })
}

const coveragesReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...{usage: await coverageReport(site, true)}, site: site})
  }

  console.log('')
  console.log('COVERAGES')

  const maxCoverage = getMax(arr, 'usage')
  const minCoverage = getMin(arr, 'usage')
  const avgCoverage = getAverage(arr, 'usage')

  console.log(`📊 Site with largest coverage: ${maxCoverage.site.title} [${getRound(maxCoverage['usage'])}]`)
  console.log(`📊 Site with smallest coverage: ${minCoverage.site.title} [${getRound(minCoverage['usage'])}]`)
  console.log(`📊 Average coverage: ${getRound(avgCoverage)}`)

  return {
    maxCoverage: maxCoverage,
    minCoverage: minCoverage,
    avgCoverage: avgCoverage,
  }
}

module.exports = {
  coverageReport,
  coveragesReport
}

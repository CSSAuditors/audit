const files = require('./files')

const coverage = async (site, ret) => {
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

    if(ret !== true) {
      console.log('')
      console.log('COVERAGE')
      console.log(`📉[${site.title}] Bytes used: ${usage}%`)
    }

    resolve(usage)
  })
}

module.exports = coverage

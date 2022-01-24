const helpers = require('./helpers.js')
const puppeteer = require('puppeteer')

const coverage = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const coverageFile = `${folder}/coverage.json`

    if(!helpers.fileExists(coverageFile)) {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.coverage.startCSSCoverage()
      await page.goto(site.url)
      await page.setViewport({
        width: 1280,
        height: 768,
        deviceScaleFactor: 1
      })
      const cssCoverage = await page.coverage.stopCSSCoverage()
      await browser.close()

      helpers.saveFile(coverageFile, cssCoverage, true)

      if(!silent) {
        console.log(`✅ Coverage file created in ${folder}`)
      }
    } else {
      if(!silent) {
        console.log(`🌖 Coverage file: ${coverageFile}`)
      }
    }

    resolve()
  })
}

module.exports = coverage

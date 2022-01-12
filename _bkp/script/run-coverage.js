const files = require('./files.js')
const puppeteer = require('puppeteer')

const coverage = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const coverageFile = `${folder}/coverage.json`

    if(!files.fileExists(coverageFile)) {
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

      files.saveFile(coverageFile, cssCoverage, true)

      console.log(`✅ Coverage file created in ${folder}`)
    } else {
      console.log(`🌖 Coverage file: ${coverageFile}`)
    }

    resolve()
  })
}

module.exports = coverage

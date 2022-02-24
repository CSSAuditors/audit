const helpers = require('./helpers.js')
const puppeteer = require('puppeteer')

const screenshot = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const screenshotFile = `${folder}/screenshot.jpg`

    if(!helpers.fileExists(screenshotFile)) {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      await page.goto(site.url)
      await page.setViewport({
        width: 1280,
        height: 768,
        deviceScaleFactor: 1
      })
      await page.screenshot({
        // fullPage: true,
        type: 'jpeg',
        quality: 90,
        path: screenshotFile
      })
      await browser.close()

      if(!silent) {
        console.log(`✅ Screenshot file created in ${folder}`)
      }
    } else {
      if(!silent) {
        console.log(`📸 Screenshot file: ${screenshotFile}`)
      }
    }

    resolve()
  })
}

module.exports = screenshot

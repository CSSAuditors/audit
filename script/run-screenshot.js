const files = require('./files.js')
const puppeteer = require('puppeteer')

const screenshot = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const screenshotFile = `${folder}/screenshot.jpg`

    if(!files.fileExists(screenshotFile)) {
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

      console.log(`✅ Screenshot file created in ${folder}`)
    } else {
      console.log(`📸 Screenshot file: ${screenshotFile}`)
    }

    resolve()
  })
}

module.exports = screenshot

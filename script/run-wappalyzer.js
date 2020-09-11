const files = require('./files.js')
const Wappalyzer = require('wappalyzer')

const wapp = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const wappalyzerFile = `${folder}/wappalyzer.json`

    if(!files.fileExists(wappalyzerFile)) {
      const wappalyzerConfig = {
        debug: false,
        delay: 500,
        headers: {},
        maxDepth: 3,
        maxUrls: 10,
        maxWait: 5000,
        recursive: true,
        probe: true,
        userAgent: 'Wappalyzer',
        htmlMaxCols: 2000,
        htmlMaxRows: 2000,
      }

      const wappalyzer = new Wappalyzer()

      try {
        await wappalyzer.init()

        // Optionally set additional request headers
        const headers = {}

        const website = wappalyzer.open(site.url, headers)

        // Optionally capture and output errors
        website.on('error', console.error)

        const results = await website.analyze()

        files.saveFile(wappalyzerFile, results, true)

        console.log(`✅ Wappalyzer file created in ${folder}`)
      } catch (error) {
        console.error(error)
      }

      await wappalyzer.destroy()
    } else {
      console.log(`📚 Wappalyzer file: ${wappalyzerFile}`)
    }

    resolve()
  })
}

module.exports = wapp

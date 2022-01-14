const helpers = require('./helpers.js')
const Wappalyzer = require('wappalyzer')

const wapp = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const wappalyzerFile = `${folder}/wappalyzer.json`

    if(!helpers.fileExists(wappalyzerFile)) {
      const wappalyzerConfig = {
        debug: true,
        delay: 1000,
        headers: {},
        maxDepth: 1,
        maxUrls: 1000,
        maxWait: 20000,
        recursive: false,
        probe: false,
        userAgent: 'Wappalyzer',
        htmlMaxCols: 10000,
        htmlMaxRows: 10000,
      }

      const wappalyzer = new Wappalyzer()

      try {
        await wappalyzer.init()

        let error

        // Optionally set additional request headers
        const headers = {}

        const website = await wappalyzer.open(site.url, headers)

        // Optionally capture and output errors
        website.on('error', (err) => {
          console.error(site.url, err)
        })

        const results = await website.analyze()

        if(Object.values(results.urls).find(a => a.status === 200)) {
          helpers.saveFile(wappalyzerFile, results, true)

          console.log(`✅ Wappalyzer file created in ${folder}`)
        } else {

        }
      } catch (error) {
        console.error("error")
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

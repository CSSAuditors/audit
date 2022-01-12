const files = require('./files.js')
const extractCss = require('extract-css-core')
const CleanCSS = require('clean-css')

const extract = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const cssFileExtractor = `${folder}/extractor.json`
    const cssFileExtractorClean = `${folder}/extractor-clean.json`
    const cssFileDirty = `${folder}/style-dirty.css`
    const cssFileClean = `${folder}/style-clean.css`
    let cssString = ''

    if(!files.fileExists(cssFileExtractor) || !files.fileExists(cssFileDirty) || !files.fileExists(cssFileClean)) {
      let cssItems = []

      cssItems = await extractCss(site.url, {
        origins: 'include',
        timeout: 60000,
        waitUntil: 'networkidle2'
      })

      let cssItemsClean = []
      let once = false

      cssItems.map((val, j) => {
        if(!cssItemsClean.length || !cssItemsClean.find(a => a.css === val.css && a.href === val.href)) {
          cssItemsClean.push(val)
        }
      })

      files.saveFile(cssFileExtractor, cssItems, true)
      files.saveFile(cssFileExtractorClean, cssItemsClean, true)

      cssItemsClean.forEach(cssItem => {
        if (cssItem.type === 'link-or-import' || cssItem.type === 'style') {
          cssString += cssItem.css
        }
      })

      files.saveFile(cssFileDirty, cssString)

      const cssClean = new CleanCSS({
        format: 'beautify'
      }).minify(cssString)

      files.saveFile(cssFileClean, cssClean.styles)

      console.log(`✅ CSS file created in ${folder}`)
    } else {
      cssString = await files.getFile(cssFileClean)

      console.log(`🖌  CSS file: ${cssFileClean}`)
    }

    resolve()
  })
}

module.exports = extract

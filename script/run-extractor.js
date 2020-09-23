const files = require('./files.js')
const extractCss = require('extract-css-core')
const CleanCSS = require('clean-css')

const extract = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const cssFileExtractor = `${folder}/extractor.json`
    const cssFileDirty = `${folder}/style-dirty.css`
    const cssFileClean = `${folder}/style-clean.css`
    let cssString = ''

    if(!files.fileExists(cssFileExtractor) || !files.fileExists(cssFileDirty) || !files.fileExists(cssFileClean)) {
      const cssItems = await extractCss(site.url, {
        origins: 'include',
        timeout: 60000,
        waitUntil: 'networkidle2'
      })

      files.saveFile(cssFileExtractor, cssItems, true)

      cssItems.forEach(cssItem => {
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

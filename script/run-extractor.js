const helpers = require('./helpers.js')
const extractCss = require('extract-css-core')
const CleanCSS = require('clean-css')
const download = require('download');

const extract = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)

    const cssFileExtractor = `${folder}/extractor.json`
    const cssFileExtractorClean = `${folder}/extractor-clean.json`
    const cssFileDirty = `${folder}/style-dirty.css`
    const cssFileClean = `${folder}/style-clean.css`
    let cssString = ''

    if(!helpers.fileExists(cssFileExtractor) || !helpers.fileExists(cssFileDirty) || !helpers.fileExists(cssFileClean)) {
      if(site.css) {
        if(!helpers.fileExists(cssFileDirty)) {
          await download(site.css, folder, {filename: 'style-dirty.css'});
        }

        const cssString = await helpers.getFile(cssFileDirty)

        const cssClean = new CleanCSS({
          format: 'cssCleaneautify'
        }).minify(cssString)

        helpers.saveFile(cssFileClean, cssClean.styles)

        const cssItems = [{
          href: site.css,
          css: cssString,
          type: 'link-or-import'
        }]

        const cssItemsClean = [{
          href: site.css,
          css: cssClean.styles,
          type: 'link-or-import'
        }]

        helpers.saveFile(cssFileExtractor, cssItems, true)
        helpers.saveFile(cssFileExtractorClean, cssItemsClean, true)
      } else {
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

        helpers.saveFile(cssFileExtractor, cssItems, true)
        helpers.saveFile(cssFileExtractorClean, cssItemsClean, true)

        cssItemsClean.forEach(cssItem => {
          if (cssItem.type === 'link-or-import' || cssItem.type === 'style') {
            cssString += cssItem.css
          }
        })

        helpers.saveFile(cssFileDirty, cssString)

        const cssClean = new CleanCSS({
          format: 'cssCleaneautify'
        }).minify(cssString)

        helpers.saveFile(cssFileClean, cssClean.styles)
      }

      if(!silent) {
        console.log(`✅ CSS file created in ${folder}`)
      }
    } else {
      cssString = await helpers.getFile(cssFileClean)

      if(!silent) {
        console.log(`🖌 CSS file: ${cssFileClean}`)
      }
    }

    resolve()
  })
}

module.exports = extract

const files = require('./files.js')
const coverage = require('./run-coverage.js')
const screenshot = require('./run-screenshot.js')
const analyzer = require('./run-analyzer.js')
const wappalyzer = require('./run-wappalyzer.js')
const specificity = require('./run-specificity.js')
const validator = require('./run-validator.js')
const extractor = require('./run-extractor.js')
const extractCss = require('extract-css-core')
const CleanCSS = require('clean-css')

const extract = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)

    const cssFileDirty = `${folder}/style-dirty.css`
    const cssFileClean = `${folder}/style-clean.css`
    let cssString = ''

    if(!files.fileExists(cssFileClean)) {
      const cssItems = await extractCss(site.url, {
        origins: 'include'
      })

      cssItems.forEach(cssItem => {
        if (cssItem.type === 'link-or-import') {
          cssString += cssItem.css
        }
      })

      files.saveFile(cssFileDirty, cssString)

      const cssClean = new CleanCSS({
        format: 'beautify'
      }).minify(cssString)

      // console.log(cssString.styles)
      // console.log(cssString.stats)
      // console.log(cssString.warnings)
      // console.log(cssString.errors)

      files.saveFile(cssFileClean, cssClean.styles)

      // cssString = beautify(cssString, {
      //   format: 'css'
      // })

      // cssString = stripComments(cssString, {
      //   preserve: false
      // })

      console.log(`✅ CSS file created in ${folder}`)
    } else {
      cssString = await files.getFile(cssFileClean)

      console.log(`🖌  CSS file: ${cssFileClean}`)
    }

    resolve()
  })
}

module.exports = extract

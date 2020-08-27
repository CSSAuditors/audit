const files = require('./files.js')
const extractCss = require('extract-css-core')
const specificityGraph = require('specificity-graph')
const analyzer = require('@projectwallace/css-analyzer')

const sites = require('./sites.json')

const namify = (name) => name.split(' ').join('-').toLowerCase();

const extract = async (site) => {
  const folder = namify(`./reports/${site.category}/${site.year}/${site.month}/${site.title}`)

  console.log(folder);

  if(!files.directoryExists(folder)) {
    files.makeDirectory(folder)
  }

  let cssString = ''

  const cssItems = await extractCss(site.url, {
    origins: 'include'
  })

  cssItems.forEach(cssItem => {
    if (cssItem.type === 'link-or-import') {
      cssString += cssItem.css
    }
  })

  files.saveFile(`${folder}/style.css`, cssString)

  await specificityGraph(`${folder}/`, cssString, function(directory) {
    directory.forEach(dir => {
      if(dir) {
        console.log(`Specificity graph files created in ${dir}.`)
      }
    })
  })

  analyzer(cssString)
    .then(result => files.saveFile(`${folder}/analyzer.json`, result, true))
    .catch(error => console.error(error))
}

const analyze = (site) => {
  extract(site)
}

sites.forEach(site => {
  analyze(site)
})

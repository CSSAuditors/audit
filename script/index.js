const files = require('./files.js')
const extractCss = require('extract-css-core')
const specificityGraph = require('specificity-graph');
const analyzer = require('@projectwallace/css-analyzer');

const sites = require('./sites.json')

const extract = async (site) => {
  let cssString = ''
  const cssItems = await extractCss(site.url, {
    origins: 'include'
  })


  cssItems.forEach(cssItem => {
    cssString += cssItem.css;
  })

  specificityGraph(`./script/${site.name}/`, cssString, function(directory) {
    console.log('specificity-graph files created in ' + directory);
  });

  analyzer(cssString)
    .then(result => files.saveFile(`./script/${site.name}/analyzer.json`, result))
    .catch(error => console.error(error))
}

const analyze = (site) => {
  extract(site);
}

sites.forEach(site => {
  analyze(site);
})

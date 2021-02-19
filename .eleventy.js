const markdownIt = require('markdown-it')
const markdownItRenderer = new markdownIt()
const extractor = require('./script/get-extractor')
const wappalyzer = require('./script/get-wappalyzer')
let globalVars = {}
const env = require('./site/_data/env')

let siteData = {
  authors: require('./site/_data/authors.json'),
  sites2: require('./site/_data/sites2.json')
}

module.exports = (eleventyConfig) => {
  const cleanup = (str) => str.replace(/\n/g, '\n\n').trim()

  const shortcodes = (str) => str.replace(/\[u\]/g, '<span class="highlight">').replace(/\[\\u\]/g, '</span>')

  const runMarkdown = (str) => shortcodes(markdownItRenderer.render(cleanup(str)))

  const runMarkdownInline = (str) => shortcodes(markdownItRenderer.renderInline(cleanup(str)))

  const checkGlobalVars = (key, object, type) => {
    if(!globalVars.hasOwnProperty(key)) {
      switch (type) {
        case 'extractor':
          globalVars[key] = extractor.generateExtractorsReport(siteData[object])
          break;
        case 'wappalyzer':
          globalVars[key] = wappalyzer.generateWappalyzersReport(siteData[object])
          break;
        default:
          break;
      }
    }
  }

  const charts = (str, object, type) => {
    const key = `${object}-chart`

    if(!globalVars.hasOwnProperty(key)) {
      globalVars[key] = `window.Highcharts.chart('${str}', ${variable('$html' + str, object, type)});`
    } else {
      globalVars[key] += `\nwindow.Highcharts.chart('${str}', ${variable('$html' + str, object, type)});`
    }
  }

  eleventyConfig.addLiquidFilter('linkify', (links) => {
    let ret = ''

    const $links = links.map(s => '<li><a class="plain" href="' + s.href + '">' + s.name + '</a></li>')

    if($links) {
      ret = `<ul>${$links.join('')}</ul>`
    }

    return ret || str
  })

  eleventyConfig.addLiquidFilter('quotify', (quote, author) => {
    const a = author ? `<p>— ${author}</p>` : ''
    const ret = `<blockquote>${runMarkdown(quote)}${a}</blockquote>`

    return ret
  })

  eleventyConfig.addLiquidFilter('imagize', (src, alt, size) => {
    return `<img class="" src="${src}" alt="${alt}" height="${size}" width="${size}">`
  })

  eleventyConfig.addLiquidFilter('authorize', (str, key) => {
    const author = siteData.authors.find(a => a.name === str || a.full_name === str)

    return author ? author[key] : '' || str
  })

  eleventyConfig.addLiquidFilter('chartize', (str, object, type) => {
    charts(str, object, type)

    return `<div class="chart" id="${str}"></div>`
  })

  eleventyConfig.addLiquidFilter('charts', (str, object) => {
    const key = `${object}-chart`

    if(globalVars.hasOwnProperty(key)) {
      return `<script>${globalVars[key]}</script>`
    }

    return ''
  })

  const variable = (str, object, type) => {
    const key = `${object}-${type}`

    checkGlobalVars(key, object, type)

    return globalVars[key][str]
  }

  eleventyConfig.addLiquidFilter('variablize', variable)

  eleventyConfig.addLiquidFilter('markdownifyi', (str) => runMarkdownInline(str))

  eleventyConfig.addLiquidFilter('markdownify', (str) => runMarkdown(str))

  eleventyConfig.addPassthroughCopy({"assets/dist": "."})
  eleventyConfig.addPassthroughCopy({"assets/styleguide": "./styleguide"})
  eleventyConfig.addPassthroughCopy({"assets/favicon": "."})

  return {
    dir: {
      input: 'site',
      output: 'public',
      layouts: '_layouts',
      data: '_data',
      htmlTemplateEngine: 'liquid',
      markdownTemplateEngine: 'liquid'
    }
  }
}

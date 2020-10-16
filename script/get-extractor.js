const filesize = require('filesize')
const { getFolder, getReportsFolder, fileExists, getFile, generateHTML, generatePDF } = require('./files')
const { getMax, getMin, getMins, getAverage, getRound, getPercent, getSize, getCount, getGzipSize } = require('./calc')
const { template, wrapLines, generateSites, reportDate } = require('./template')

const getName = (type) => {
  let name = 'Undefined'
  switch (type) {
    case 'gzip':
      name = 'Gzip CSS'
      break
    case 'link-or-import':
      name = 'External CSS'
      break
    case 'style':
      name = 'Style tag CSS'
      break
    case 'inline':
      name = 'Inline CSS'
      break
    default:
      name = ''
      break
  }

  return name
}

const getExtractorReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)
    const extractorFile = `${folder}/extractor.json`

    if(!fileExists(extractorFile)) {
      return false
    }

    const extractorRaw = await getFile(extractorFile)
    const extractorData = JSON.parse(extractorRaw)

    const extractorInfo = {}
    let totalSize = 0

    extractorData.forEach(data => {
      if(!extractorInfo.hasOwnProperty(data.type)) {
        extractorInfo[data.type] = {
          name: getName(data.type),
          count: 0,
          size: 0,
          css: ''
        }
      }

      extractorInfo[data.type].count += 1
      extractorInfo[data.type].size += data.css.length
      extractorInfo[data.type].gzip += getGzipSize(data.css)
      extractorInfo[data.type].css += data.css
      totalSize += data.css.length
    })

    if(!silent) {
      console.log('')
      console.log('EXTRACTOR')
    }

    let output = ''

    Object.values(extractorInfo).forEach(info => {
      output += `
        📉 [${site.title}] Total count of ${info.name}: ${info.count}
        📉 [${site.title}] Total size of ${info.name}: ${filesize(info.size)}
        📉 [${site.title}] Total gzipped size of ${info.name}: ${filesize(getGzipSize(info.css))}
        📉 [${site.title}] Percent of ${info.name}: ${getPercent(info.size, totalSize)}
      `
    })

    if(!silent) {
      console.log(output)
    }

    resolve({
      extractor: extractorInfo,
      output: output
    })
  })
}

const getExtractorsReport = async (sites, silent) => {
  const arr = []

  for(const site of sites) {
    arr.push({...await getExtractorReport(site, true), site: site})
  }

  if(!silent) {
    console.log('')
    console.log('EXTRACTORS')
  }

  const maxSizeImport = getMax(arr, 'extractor', 'link-or-import', 'size')
  const minSizeImport = getMin(arr, 'extractor', 'link-or-import', 'size')
  const minSizeImports = getMins(arr, 'extractor', 'link-or-import', 'size')
  const avgSizeImport = getAverage(arr, 'extractor', 'link-or-import', 'size')
  const maxSizeStyle = getMax(arr, 'extractor', 'style', 'size')
  const minSizeStyle = getMin(arr, 'extractor', 'style', 'size')
  const minSizeStyles = getMins(arr, 'extractor', 'style', 'size')
  const avgSizeStyle = getAverage(arr, 'extractor', 'style', 'size')
  const maxSizeInline = getMax(arr, 'extractor', 'inline', 'size')
  const minSizeInline = getMin(arr, 'extractor', 'inline', 'size')
  const minSizeInlines = getMins(arr, 'extractor', 'inline', 'size')
  const avgSizeInline = getAverage(arr, 'extractor', 'inline', 'size')

  const minSizeImportText = minSizeImports.length ? `📊 Sites with no ${getName('link-or-import')}: ${minSizeImports.reduce(a => a.site.title).join(',')}` : `📊 Site with smallest ${getName('link-or-import')}: ${minSizeImport.site.title} [${filesize(minSizeImport.extractor['link-or-import'].size)}/${filesize(getGzipSize(minSizeImport.extractor['link-or-import'].css))} gzipped]`
  const minSizeStyleText = minSizeStyles.length ? `📊 Sites with no ${getName('style')}: ${minSizeStyles.map(a => a.site.title)}` : `📊 Site with smallest ${getName('style')}: ${minSizeStyle.site.title} [${filesize(minSizeStyle.extractor['style'].size)}]`
  const minSizeInlineText = minSizeInlines.length ? `📊 Sites with no ${getName('inline')}: ${minSizeInlines.map(a => a.site.title)}` : `📊 Site with smallest ${getName('inline')}: ${minSizeInline.site.title} [${filesize(minSizeInline.extractor['inline'].size)}]`

  let outputSizes = `
    📊 Site with largest ${getName('link-or-import')}: ${maxSizeImport.site.title} [${filesize(maxSizeImport.extractor['link-or-import'].size)}/${filesize(getGzipSize(maxSizeImport.extractor['link-or-import'].css))} gzipped]
    ${minSizeImportText}
    📊 Average size of ${getName('link-or-import')}: ${filesize(avgSizeImport)}
    📊 Site with largest ${getName('style')}: ${maxSizeStyle.site.title} [${filesize(maxSizeStyle.extractor['style'].size)}]
    ${minSizeStyleText}
    📊 Average size of ${getName('style')}: ${filesize(avgSizeStyle)}
    📊 Site with largest ${getName('inline')}: ${maxSizeInline.site.title} [${filesize(maxSizeInline.extractor['inline'].size)}]
    ${minSizeInlineText}
    📊 Average size of ${getName('inline')}: ${filesize(avgSizeInline)}
  `

  const maxCountImport = getMax(arr, 'extractor', 'link-or-import', 'count')
  const minCountImport = getMin(arr, 'extractor', 'link-or-import', 'count')
  const minCountImports = getMins(arr, 'extractor', 'link-or-import', 'count')
  const avgCountImport = getAverage(arr, 'extractor', 'link-or-import', 'count')
  const maxCountStyle = getMax(arr, 'extractor', 'style', 'count')
  const minCountStyle = getMin(arr, 'extractor', 'style', 'count')
  const minCountStyles = getMins(arr, 'extractor', 'style', 'count')
  const avgCountStyle = getAverage(arr, 'extractor', 'style', 'count')
  const maxCountInline = getMax(arr, 'extractor', 'inline', 'count')
  const minCountInline = getMin(arr, 'extractor', 'inline', 'count')
  const minCountInlines = getMins(arr, 'extractor', 'inline', 'count')
  const avgCountInline = getAverage(arr, 'extractor', 'inline', 'count')

  const minCountImportText = minCountImports.length ? `📊 Sites with no ${getName('link-or-import')}: ${minCountImports.reduce(a => a.site.title).join(',')}` : `📊 Site with smallest ${getName('link-or-import')}: ${minCountImport.site.title} [${minCountImport.extractor['link-or-import'].count}]`
  const minCountStyleText = minCountStyles.length ? `📊 Sites with no ${getName('style')}: ${minCountStyles.map(a => a.site.title)}` : `📊 Site with smallest ${getName('style')}: ${minCountStyle.site.title} [${minCountStyle.extractor['style'].count}]`
  const minCountInlineText = minCountInlines.length ? `📊 Sites with no ${getName('inline')}: ${minCountInlines.map(a => a.site.title)}` : `📊 Site with smallest ${getName('inline')}: ${minCountInline.site.title} [${minCountInline.extractor['inline'].count}]`

  let outputCount = `
    📊 Site with largest ${getName('link-or-import')}: ${maxCountImport.site.title} [${maxCountImport.extractor['link-or-import'].count}]
    ${minCountImportText}
    📊 Average size of ${getName('link-or-import')}: ${getRound(avgCountImport, 0)}
    📊 Site with largest ${getName('style')}: ${maxCountStyle.site.title} [${maxCountStyle.extractor['style'].count}]
    ${minCountStyleText}
    📊 Average size of ${getName('style')}: ${getRound(avgCountStyle, 0)}
    📊 Site with largest ${getName('inline')}: ${maxCountInline.site.title} [${maxCountInline.extractor['inline'].count}]
    ${minCountInlineText}
    📊 Average size of ${getName('inline')}: ${getRound(avgCountInline, 0)}
  `

  if(!silent) {
    console.log(outputSizes)
    console.log(outputCount)
  }

  return {
    maxSizeImport: maxSizeImport,
    minSizeImport: minSizeImport,
    avgSizeImport: avgSizeImport,
    maxSizeStyle: maxSizeStyle,
    minSizeStyle: minSizeStyle,
    avgSizeStyle: avgSizeStyle,
    maxSizeInline: maxSizeInline,
    minSizeInline: minSizeInline,
    avgSizeInline: avgSizeInline,
    maxCountImport: maxCountImport,
    minCountImport: minCountImport,
    avgCountImport: avgCountImport,
    maxCountStyle: maxCountStyle,
    minCountStyle: minCountStyle,
    avgCountStyle: avgCountStyle,
    maxCountInline: maxCountInline,
    minCountInline: minCountInline,
    avgCountInline: avgCountInline,
    list: arr.map(a => Object.assign(a.extractor, { site: a.site.title })),
    outputSizes: outputSizes,
    outputCount: outputCount,
    outputSingle: arr.map(a => a.output).join('')
  }
}

const generateExtractorsReport = async (sites) => {
  const folder = getReportsFolder(sites[0])
  const report = await getExtractorsReport(sites, true)

  const extractorHTML = `./templates/report-sizes.html`

  if(!fileExists(extractorHTML)) {
    return false
  }

  const extractorRaw = await getFile(extractorHTML)

  const categories = JSON.stringify(report.list.map(a => a.site))

  const seriesSizeCombined = JSON.stringify([{
    name: getName('gzip'),
    data: report.list.map(a => getGzipSize(a, 'link-or-import', 'css'))
  }, {
    name: getName('link-or-import'),
    data: report.list.map(a => getSize(a, 'link-or-import'))
  }, {
    name: getName('style'),
    data: report.list.map(a => getSize(a, 'style'))
  }, {
    name: getName('inline'),
    data: report.list.map(a => getSize(a, 'inline'))
  }])

  const seriesSizeLink = JSON.stringify([{
    name: getName('link-or-import'),
    data: report.list.map(a => getSize(a, 'link-or-import'))
  }])

  const seriesSizeGzip = JSON.stringify([{
    name: getName('gzip'),
    data: report.list.map(a => getGzipSize(a, 'link-or-import', 'css'))
  }])

  const seriesSizeStyle = JSON.stringify([{
    name: getName('style'),
    data: report.list.map(a => getSize(a, 'style'))
  }])

  const seriesSizeInline = JSON.stringify([{
    name: getName('inline'),
    data: report.list.map(a => getSize(a, 'inline'))
  }])

  const seriesCountCombined = JSON.stringify([{
    name: getName('link-or-import'),
    data: report.list.map(a => getCount(a, 'link-or-import'))
  }, {
    name: getName('style'),
    data: report.list.map(a => getCount(a, 'style'))
  }, {
    name: getName('inline'),
    data: report.list.map(a => getCount(a, 'inline'))
  }])

  const seriesCountLink = JSON.stringify([{
    name: getName('link-or-import'),
    data: report.list.map(a => getCount(a, 'link-or-import'))
  }])

  const seriesCountStyle = JSON.stringify([{
    name: getName('style'),
    data: report.list.map(a => getCount(a, 'style'))
  }])

  const seriesCountImport = JSON.stringify([{
    name: getName('inline'),
    data: report.list.map(a => getCount(a, 'inline'))
  }])

  const extractorReport = template(extractorRaw, {
    $htmlReportSizes: `<ul>${wrapLines(report.outputSizes, '\n', 'li', '\n')}</ul>`,
    $htmlReportSizeCombined: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: 'Sizes Report'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Size [B]'
        }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: ${seriesSizeCombined}
    }`,
    $htmlReportSizeLink: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('link-or-import')} Sizes'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Size [B]'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesSizeLink}
    }`,
    $htmlReportSizeGzip: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('gzip')} Sizes'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Size [B]'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesSizeGzip}
    }`,
    $htmlReportSizeStyle: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('style')} Sizes'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Size [B]'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesSizeStyle}
    }`,
    $htmlReportSizeInline: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('inline')} Sizes'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Size [B]'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesSizeInline}
    }`,
    $htmlReportCount: `<ul>${wrapLines(report.outputCount, '\n', 'li', '\n')}</ul>`,
    $htmlReportCountCombined: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('link-or-import')} Count'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: ${seriesCountCombined}
    }`,
    $htmlReportCountLink: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('link-or-import')} Count'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesCountLink}
    }`,
    $htmlReportCountStyle: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('style')} Count'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesCountStyle}
    }`,
    $htmlReportCountInline: `{
      chart: {
        type: 'bar',
        height: 750
      },
      title: {
        text: '${getName('inline')} Count'
      },
      xAxis: {
        categories: ${categories}
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Count'
        }
      },
      legend: {
          reversed: true
      },
      series: ${seriesCountImport}
    }`,
    $htmlReportSingle: `<ul>${wrapLines(report.outputSingle, '\n', 'li', '\n')}</ul>`,
    $htmlSites: `<ul>${generateSites(sites)}</ul>`,
    $htmlDate: reportDate(sites[0])
  })

  generateHTML(extractorReport, `${folder}/report-sizes.html`)
  generatePDF(extractorReport, `${folder}/report-sizes.pdf`)
}

module.exports = {
  getExtractorReport,
  getExtractorsReport,
  generateExtractorsReport
}

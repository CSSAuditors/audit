const filesize = require('filesize')
const striptags = require('striptags')
const { getFolder, fileExists, getFile, getFileSync, saveFile } = require('./files')
const { getMax, getMin, getMins, getAverage, getRound, getPercent, getSize, getCount, getGzipSize } = require('./calc')
const { wrapLines, generateSites, reportDate } = require('./template')

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
    const extractorFile = `${folder}/extractor-clean.json`

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
        ${site.title}
        Total count of ${info.name}: ${info.count}
        Total size of ${info.name}: ${filesize(info.size)}
        Total gzipped size of ${info.name}: ${filesize(getGzipSize(info.css))}
        Percent of ${info.name}: ${getPercent(info.size, totalSize)}
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

  const minSizeImportText = minSizeImports.length ? `<th>Sites with no ${getName('link-or-import')}</th><td>${minSizeImports.reduce(a => a.site.title).join(',')}</td><td></td>` : `<th>Site with the smallest ${getName('link-or-import')}</th><td>${minSizeImport.site.title}</td><td>${filesize(minSizeImport.extractor['link-or-import'].size)}</td>`
  const minSizeStyleText = minSizeStyles.length ? `<th>Sites with no ${getName('style')}</th><td>${minSizeStyles.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest ${getName('style')}</th><td>${minSizeStyle.site.title}</td><td>${filesize(minSizeStyle.extractor['style'].size)}</td>`
  const minSizeInlineText = minSizeInlines.length ? `<th>Sites with no ${getName('inline')}</th><td>${minSizeInlines.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest ${getName('inline')}</th><td>${minSizeInline.site.title}</td><td>${filesize(minSizeInline.extractor['inline'].size)}</td>`

  let outputSizes = `
    <th>Site with the largest ${getName('link-or-import')} size</th><td>${maxSizeImport.site.title}</td><td>${filesize(maxSizeImport.extractor['link-or-import'].size)}</td>
    ${minSizeImportText}
    <th>Average size of ${getName('link-or-import')} site</th><td></td><td>${filesize(avgSizeImport)}</td>
    <th>Site with the largest ${getName('style')} size</th><td>${maxSizeStyle.site.title}</td><td>${filesize(maxSizeStyle.extractor['style'].size)}</td>
    ${minSizeStyleText}
    <th>Average size of ${getName('style')} site</th><td></td><td>${filesize(avgSizeStyle)}</td>
    <th>Site with the largest ${getName('inline')} size</th><td>${maxSizeInline.site.title}</td><td>${filesize(maxSizeInline.extractor['inline'].size)}</td>
    ${minSizeInlineText}
    <th>Average size of ${getName('inline')} site</th><td></td><td>${filesize(avgSizeInline)}</td>
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

  const minCountImportText = minCountImports.length ? `<th>Sites with no ${getName('link-or-import')}</th><td>${minCountImports.reduce(a => a.site.title).join(',')}</td><td></td>` : `<th>Site with the smallest number of ${getName('link-or-import')} files</th><td>${minCountImport.site.title}</td><td>${minCountImport.extractor['link-or-import'].count}</td>`
  const minCountStyleText = minCountStyles.length ? `<th>Sites with no ${getName('style')}</th><td>${minCountStyles.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest number of ${getName('style')}</th><td>${minCountStyle.site.title}</td><td>${minCountStyle.extractor['style'].count}</td>`
  const minCountInlineText = minCountInlines.length ? `<th>Sites with no ${getName('inline')}</th><td>${minCountInlines.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest number of ${getName('inline')} occurrences</th><td>${minCountInline.site.title}</td><td>${minCountInline.extractor['inline'].count}</td>`

  let outputCount = `
    <th>Site with the largest number of ${getName('link-or-import')} files</th><td>${maxCountImport.site.title}</td><td>${maxCountImport.extractor['link-or-import'].count}</td>
    ${minCountImportText}
    <th>Average number of ${getName('link-or-import')} files</th><td></td><td>${getRound(avgCountImport, 0)}</td>
    <th>Site with the largest number of ${getName('style')}</th><td>${maxCountStyle.site.title}</td><td>${maxCountStyle.extractor['style'].count}</td>
    ${minCountStyleText}
    <th>Average number of ${getName('style')}</th><td></td><td>${getRound(avgCountStyle, 0)}</td>
    <th>Site with the largest number of ${getName('inline')} occurrences</th><td>${maxCountInline.site.title}</td><td>${maxCountInline.extractor['inline'].count}</td>
    ${minCountInlineText}
    <th>Average number of ${getName('inline')} occurrences</th><td></td><td>${getRound(avgCountInline, 0)}
  `

  if(!silent) {
    console.log(striptags(outputSizes.replace(/<\/th>/g, ': ')))
    console.log(striptags(outputCount.replace(/<\/th>/g, ': ')))
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

const getExtractorReportSync = (site, silent) => {
  const folder = getFolder(site)
  const extractorFile = `${folder}/extractor-clean.json`

  if(!fileExists(extractorFile)) {
    return false
  }

  const extractorRaw = getFileSync(extractorFile)
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
      ${site.title}
      Total count of ${info.name}: ${info.count}
      Total size of ${info.name}: ${filesize(info.size)}
      Total gzipped size of ${info.name}: ${filesize(getGzipSize(info.css))}
      Percent of ${info.name}: ${getPercent(info.size, totalSize)}
    `
  })

  if(!silent) {
    console.log(output)
  }

  return {
    extractor: extractorInfo,
    output: output
  }
}

const getExtractorsReportSync = (sites, silent) => {
  const arr = []

  for(const site of sites) {
    arr.push({...getExtractorReportSync(site, true), site: site})
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

  const minSizeImportText = minSizeImports.length ? `<th>Sites with no ${getName('link-or-import')}</th><td>${minSizeImports.length > 1 ? minSizeImports.reduce(a => a.site.title).join(',') : minSizeImports[0].site.title}</td><td></td>` : `<th>Site with the smallest ${getName('link-or-import')}</th><td>${minSizeImport.site.title}</td><td>${filesize(minSizeImport.extractor['link-or-import'].size)}</td>`
  const minSizeStyleText = minSizeStyles.length ? `<th>Sites with no ${getName('style')}</th><td>${minSizeStyles.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest ${getName('style')}</th><td>${minSizeStyle.site.title}</td><td>${filesize(minSizeStyle.extractor['style'].size)}</td>`
  const minSizeInlineText = minSizeInlines.length ? `<th>Sites with no ${getName('inline')}</th><td>${minSizeInlines.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest ${getName('inline')}</th><td>${minSizeInline.site.title}</td><td>${filesize(minSizeInline.extractor['inline'].size)}</td>`

  let outputSizes = `
    <th>Site with the largest ${getName('link-or-import')} size</th><td>${maxSizeImport.site.title}</td><td>${filesize(maxSizeImport.extractor['link-or-import'].size)}</td>
    ${minSizeImportText}
    <th>Average size of ${getName('link-or-import')} site</th><td></td><td>${filesize(avgSizeImport)}</td>
    <th>Site with the largest ${getName('style')} size</th><td>${maxSizeStyle.site.title}</td><td>${filesize(maxSizeStyle.extractor['style'].size)}</td>
    ${minSizeStyleText}
    <th>Average size of ${getName('style')} site</th><td></td><td>${filesize(avgSizeStyle)}</td>
    <th>Site with the largest ${getName('inline')} size</th><td>${maxSizeInline.site.title}</td><td>${filesize(maxSizeInline.extractor['inline'].size)}</td>
    ${minSizeInlineText}
    <th>Average size of ${getName('inline')} site</th><td></td><td>${filesize(avgSizeInline)}</td>
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

  const minCountImportText = minCountImports.length > 0 ? `<th>Sites with no ${getName('link-or-import')}</th><td>${minCountImports.length > 1 ? minCountImports.reduce(a => a.site.title).join(',') : minCountImports[0].site.title}</td><td></td>` : `<th>Site with the smallest number of ${getName('link-or-import')} files</th><td>${minCountImport.site.title}</td><td>${minCountImport.extractor['link-or-import'].count}</td>`
  const minCountStyleText = minCountStyles.length > 0 ? `<th>Sites with no ${getName('style')}</th><td>${minCountStyles.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest number of ${getName('style')}</th><td>${minCountStyle.site.title}</td><td>${minCountStyle.extractor['style'].count}</td>`
  const minCountInlineText = minCountInlines.length > 0 ? `<th>Sites with no ${getName('inline')}</th><td>${minCountInlines.map(a => a.site.title)}</td><td></td>` : `<th>Site with the smallest number of ${getName('inline')} occurrences</th><td>${minCountInline.site.title}</td><td>${minCountInline.extractor['inline'].count}</td>`

  let outputCount = `
    <th>Site with the largest number of ${getName('link-or-import')} files</th><td>${maxCountImport.site.title}</td><td>${maxCountImport.extractor['link-or-import'].count}</td>
    ${minCountImportText}
    <th>Average number of ${getName('link-or-import')} files</th><td></td><td>${getRound(avgCountImport, 0)}</td>
    <th>Site with the largest number of ${getName('style')}</th><td>${maxCountStyle.site.title}</td><td>${maxCountStyle.extractor['style'].count}</td>
    ${minCountStyleText}
    <th>Average number of ${getName('style')}</th><td></td><td>${getRound(avgCountStyle, 0)}</td>
    <th>Site with the largest number of ${getName('inline')} occurrences</th><td>${maxCountInline.site.title}</td><td>${maxCountInline.extractor['inline'].count}</td>
    ${minCountInlineText}
    <th>Average number of ${getName('inline')} occurrences</th><td></td><td>${getRound(avgCountInline, 0)}
  `

  if(!silent) {
    console.log(striptags(outputSizes.replace(/<\/th>/g, ': ')))
    console.log(striptags(outputCount.replace(/<\/th>/g, ': ')))
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

const generateExtractorsReport = (sites, fresh) => {
  const folder = getFolder(sites[0], true)
  const extractorFile = `${folder}/extractor.json`
  let extractorData

  if(fileExists(extractorFile)) {
    extractorData = JSON.parse(getFileSync(extractorFile))
  }

  if(fresh || !extractorData) {
    const report = getExtractorsReportSync(sites, true)
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

    extractorData = {
      $htmlReportSizes: `<table>${wrapLines(report.outputSizes, '\n', 'tr', '\n')}</table>`,
      $htmlReportSizeCombined: `{
        chart: {
          type: 'bar',
          height: 750
        },
        title: {
          text: 'Overall Sizes'
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
          text: '${getName('link-or-import')}'
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
          text: '${getName('gzip')}'
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
          text: '${getName('style')}'
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
          text: '${getName('inline')}'
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
      $htmlReportCount: `<table>${wrapLines(report.outputCount, '\n', 'tr', '\n')}</table>`,
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
    }

    saveFile(extractorFile, extractorData, true)
  }

  return extractorData
}

module.exports = {
  getExtractorReport,
  getExtractorsReport,
  generateExtractorsReport,
}

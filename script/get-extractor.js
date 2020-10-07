const filesize = require('filesize')
const files = require('./files')
const pdf = require('html-pdf')
const { getMax, getMin, getAverage, getPercent } = require('./calc')
const { template, wrapLines } = require('./template')

const getName = (type) => {
  let name = 'Undefined'
  switch (type) {
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
      break
  }

  return name
}

const getExtractorReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const extractorFile = `${folder}/extractor.json`

    if(!files.fileExists(extractorFile)) {
      return false
    }

    const extractorRaw = await files.getFile(extractorFile)
    const extractorData = JSON.parse(extractorRaw)

    const extractorInfo = {}
    let totalSize = 0

    extractorData.forEach(data => {
      if(!extractorInfo.hasOwnProperty(data.type)) {
        extractorInfo[data.type] = {
          name: getName(data.type),
          count: 0,
          size: 0
        }
      }

      extractorInfo[data.type].count += 1
      extractorInfo[data.type].size += data.css.length
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
        📉 [${site.title}] Total size of ${info.name}: ${filesize(info.size, {base: 10})}
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

  const maxImport = getMax(arr, 'extractor', 'link-or-import', 'size')
  const minImport = getMin(arr, 'extractor', 'link-or-import', 'size')
  const avgImport = getAverage(arr, 'extractor', 'link-or-import', 'size')
  const maxStyle = getMax(arr, 'extractor', 'style', 'size')
  const minStyle = getMin(arr, 'extractor', 'style', 'size')
  const avgStyle = getAverage(arr, 'extractor', 'style', 'size')
  const maxInline = getMax(arr, 'extractor', 'inline', 'size')
  const minInline = getMin(arr, 'extractor', 'inline', 'size')
  const avgInline = getAverage(arr, 'extractor', 'inline', 'size')

  let output = `
    📊 Site with largest ${getName('link-or-import')}: ${maxImport.site.title} [${filesize(maxImport.extractor['link-or-import'].size, {base: 10})}]
    📊 Site with smallest ${getName('link-or-import')}: ${minImport.site.title} [${filesize(minImport.extractor['link-or-import'].size, {base: 10})}]
    📊 Average size of ${getName('link-or-import')}: ${filesize(avgImport, {base: 10})}
    📊 Site with largest ${getName('style')}: ${maxStyle.site.title} [${filesize(maxStyle.extractor['style'].size, {base: 10})}]
    📊 Site with smallest ${getName('style')}: ${minStyle.site.title} [${filesize(minStyle.extractor['style'] && minStyle['style'].size ? minStyle['style'].size : 0, {base: 10})}]
    📊 Average size of ${getName('style')}: ${filesize(avgStyle, {base: 10})}
    📊 Site with largest ${getName('inline')}: ${maxInline.site.title} [${filesize(maxInline.extractor['inline'].size, {base: 10})}]
    📊 Site with smallest ${getName('inline')}: ${minInline.site.title} [${filesize(minInline.extractor['inline'].size, {base: 10})}]
    📊 Average size of ${getName('inline')}: ${filesize(avgInline, {base: 10})}
  `

  if(!silent) {
    console.log(output)
  }

  return {
    maxImport: maxImport,
    minImport: minImport,
    avgImport: avgImport,
    maxStyle: maxStyle,
    minStyle: minStyle,
    avgStyle: avgStyle,
    maxInline: maxInline,
    minInline: minInline,
    avgInline: avgInline,
    outputAll: output,
    outputSingle: arr.map(a => a.output).join('')
  }
}

const generateExtractorsReport = async (sites) => {
  const report = await getExtractorsReport(sites, true)

  const extractorHTML = `./templates/report.html`

  if(!files.fileExists(extractorHTML)) {
    return false
  }

  const extractorRaw = await files.getFile(extractorHTML)

  const extractorReport = template(extractorRaw, {
    $htmlReportAll: wrapLines(report.outputAll, '\n', 'p', ''),
    $htmlReportSingle: wrapLines(report.outputSingle, '\n', 'p', '')
  })

  files.saveFile('./report.html', extractorReport)

  pdf.create(extractorReport).toFile('./test.pdf', function(err, res) {
    if (err) {
      return console.log(err)
    }

    console.log(res)
  })
}

module.exports = {
  getExtractorReport,
  getExtractorsReport,
  generateExtractorsReport
}

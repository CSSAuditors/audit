const filesize = require('filesize')
const files = require('./files')
const { getMax, getMin, getAverage, getPercent } = require('./calc')

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

const extractorReport = async (site, silent) => {
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

    Object.values(extractorInfo).forEach(info => {
      if(!silent) {
        console.log(`📉[${site.title}] Total count of ${info.name}: ${info.count}`)
        console.log(`📉[${site.title}] Total size of ${info.name}: ${filesize(info.size, {base: 10})}`)
        console.log(`📉[${site.title}] Percent of ${info.name}: ${getPercent(info.size, totalSize)}`)
      }
    })

    resolve(extractorInfo)
  })
}

const extractorsReport = async (sites) => {
  const arr = []

  for(const site of sites) {
    arr.push({...await extractorReport(site, true), site: site})
  }

  console.log('')
  console.log('EXTRACTORS')

  const maxImport = getMax(arr, 'link-or-import', 'size')
  const minImport = getMin(arr, 'link-or-import', 'size')
  const avgImport = getAverage(arr, 'link-or-import', 'size')
  const maxStyle = getMax(arr, 'style', 'size')
  const minStyle = getMin(arr, 'style', 'size')
  const avgStyle = getAverage(arr, 'style', 'size')
  const maxInline = getMax(arr, 'inline', 'size')
  const minInline = getMin(arr, 'inline', 'size')
  const avgInline = getAverage(arr, 'inline', 'size')

  console.log(`📊 Site with largest ${getName('link-or-import')}: ${maxImport.site.title} [${filesize(maxImport['link-or-import'].size, {base: 10})}]`)
  console.log(`📊 Site with smallest ${getName('link-or-import')}: ${minImport.site.title} [${filesize(minImport['link-or-import'].size, {base: 10})}]`)
  console.log(`📊 Average size of ${getName('link-or-import')}: ${filesize(avgImport, {base: 10})}`)
  console.log(`📊 Site with largest ${getName('style')}: ${maxStyle.site.title} [${filesize(maxStyle['style'].size, {base: 10})}]`)
  console.log(`📊 Site with smallest ${getName('style')}: ${minStyle.site.title} [${filesize(minStyle['style'] && minStyle['style'].size ? minStyle['style'].size : 0, {base: 10})}]`)
  console.log(`📊 Average size of ${getName('style')}: ${filesize(avgStyle, {base: 10})}`)
  console.log(`📊 Site with largest ${getName('inline')}: ${maxInline.site.title} [${filesize(maxInline['inline'].size, {base: 10})}]`)
  console.log(`📊 Site with smallest ${getName('inline')}: ${minInline.site.title} [${filesize(minInline['inline'].size, {base: 10})}]`)
  console.log(`📊 Average size of ${getName('inline')}: ${filesize(avgInline, {base: 10})}`)

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
  }
}

module.exports = {
  extractorReport,
  extractorsReport
}

const helpers = require('./helpers')
const calc = require('./calc')

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

const getReport = (site) => {
  const folder = helpers.getFolder(site)
  const extractorFile = `${folder}/extractor-clean.json`

  if(!helpers.fileExists(extractorFile)) {
    return false
  }

  const extractorRaw = helpers.getFileSync(extractorFile)
  const extractorData = JSON.parse(extractorRaw)

  const extractorInfo = {}
  let totalSize = 0

  extractorData.forEach(data => {
    if(!extractorInfo.hasOwnProperty(data.type)) {
      extractorInfo[data.type] = {
        name: getName(data.type),
        count: 0,
        size: 0,
        gzip: 0
      }
    }

    // console.log(data.css);
    // console.log(data.css.length);
    // console.log(site);

    extractorInfo[data.type].count += 1
    extractorInfo[data.type].size += data.css.length
    extractorInfo[data.type].gzip += calc.getGzipSize(data.css)
    totalSize += data.css.length
  })

  extractorInfo.totalSize = totalSize
  extractorInfo.site = site

  return extractorInfo
}

const report = (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const extractorFile = `${root}/site/_data/${name}-extractor.json`

  if(!helpers.fileExists(extractorFile) && sites.list) {
    const extractorData = {
      list: []
    }

    for(const site of sites.list) {
      extractorData.list.push({...getReport(site)})
    }

    const averageImport = calc.getAverage(extractorData.list, 'link-or-import', 'size')

    if(averageImport) {
      extractorData.maxSizeImport = calc.getMax(extractorData.list, 'link-or-import', 'size')
      extractorData.minSizeImport = calc.getMin(extractorData.list, 'link-or-import', 'size')
      extractorData.minSizeImports = calc.getMins(extractorData.list, 'link-or-import', 'size')
      extractorData.avgSizeImport = {
        size: averageImport,
        gzip: calc.getAverage(extractorData.list, 'link-or-import', 'gzip')
      }
    }

    const averageStyle = calc.getAverage(extractorData.list, 'style', 'size')

    if(averageStyle) {
      extractorData.maxSizeStyle = calc.getMax(extractorData.list, 'style', 'size')
      extractorData.minSizeStyle = calc.getMin(extractorData.list, 'style', 'size')
      extractorData.minSizeStyles = calc.getMins(extractorData.list, 'style', 'size')
      extractorData.avgSizeStyle = {
        size: averageStyle,
        gzip: calc.getAverage(extractorData.list, 'style', 'gzip')
      }
    }

    const averageInline = calc.getAverage(extractorData.list, 'inline', 'size')

    if(averageInline) {
      extractorData.maxSizeInline = calc.getMax(extractorData.list, 'inline', 'size')
      extractorData.minSizeInline = calc.getMin(extractorData.list, 'inline', 'size')
      extractorData.minSizeInlines = calc.getMins(extractorData.list, 'inline', 'size')
      extractorData.avgSizeInline = {
        size: averageInline,
        gzip: calc.getAverage(extractorData.list, 'inline', 'gzip')
      }
    }

    if(!sites.simple) {
      extractorData.maxCountImport = calc.getMax(extractorData.list, 'link-or-import', 'count')
      extractorData.minCountImport = calc.getMin(extractorData.list, 'link-or-import', 'count')
      extractorData.minCountImports = calc.getMins(extractorData.list, 'link-or-import', 'count')
      extractorData.avgCountImport = calc.getAverage(extractorData.list, 'link-or-import', 'count')
      extractorData.maxCountStyle = calc.getMax(extractorData.list, 'style', 'count')
      extractorData.minCountStyle = calc.getMin(extractorData.list, 'style', 'count')
      extractorData.minCountStyles = calc.getMins(extractorData.list, 'style', 'count')
      extractorData.avgCountStyle = calc.getAverage(extractorData.list, 'style', 'count')
      extractorData.maxCountInline = calc.getMax(extractorData.list, 'inline', 'count')
      extractorData.minCountInline = calc.getMin(extractorData.list, 'inline', 'count')
      extractorData.minCountInlines = calc.getMins(extractorData.list, 'inline', 'count')
      extractorData.avgCountInline = calc.getAverage(extractorData.list, 'inline', 'count')
    }

    helpers.saveFile(extractorFile, extractorData, true)

    if(!silent) {
      console.log(`✅ Extractor data saved at ${extractorFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Extractor data exists at ${extractorFile}`)
    }
  }

  return true
}

module.exports = {
  getName,
  report
}

const files = require('./files')

const stylesheetReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER STYLESHEET')

    console.log(`📉[${site.title}] Total lines of code: `, analyzerData['stylesheets.linesOfCode.total'])
    console.log(`📉[${site.title}] Total lines of source code: `, analyzerData['stylesheets.linesOfCode.sourceLinesOfCode.total'])

    console.log('')
    console.log(`📉[${site.title}] Uncompressed size: `, analyzerData['stylesheets.filesize.uncompressed.totalBytes'])

    console.log('')
    console.log(`📉[${site.title}] Gzip size: `, analyzerData['stylesheets.filesize.compressed.gzip.totalBytes'])
    console.log(`📉[${site.title}] Gzip ratio: `, (analyzerData['stylesheets.filesize.compressed.gzip.compressionRatio'] * 100).toFixed(2))

    console.log('')
    console.log(`📉[${site.title}] Brotli size: `, analyzerData['stylesheets.filesize.compressed.brotli.totalBytes'])
    console.log(`📉[${site.title}] Brotli ratio: `, (analyzerData['stylesheets.filesize.compressed.brotli.compressionRatio'] * 100).toFixed(2))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack rules: `, analyzerData['stylesheets.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack rules: `, analyzerData['stylesheets.browserhacks.totalUnique'].toFixed(2))
    console.log(`📉[${site.title}] Percent of unique browser hack rules: `, `${(analyzerData['stylesheets.browserhacks.totalUnique'] === 0 || analyzerData['stylesheets.browserhacks.total'] === 0) ? 0 : parseFloat(analyzerData['stylesheets.browserhacks.totalUnique'] / analyzerData['stylesheets.browserhacks.total'] * 100).toFixed(2)}`)

    resolve()
  })
}

const declarationsReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER DECLARATIONS')

    console.log(`📉[${site.title}] Total declarations: `, analyzerData['declarations.total'])
    console.log(`📉[${site.title}] Total unique declarations: `, analyzerData['declarations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique declarations: `, `${(analyzerData['declarations.totalUnique'] === 0 || analyzerData['declarations.total'] === 0) ? 0 : parseFloat(analyzerData['declarations.totalUnique'] / analyzerData['declarations.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total !important rules: `, analyzerData['declarations.importants.total'])
    console.log(`📉[${site.title}] Total !important share: `, (analyzerData['declarations.importants.share'] * 100).toFixed(2))

    resolve()
  })
}

const rulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER RULES')

    console.log(`📉[${site.title}] Total rules: `, analyzerData['rules.total'])
    console.log(`📉[${site.title}] Total empty rules: `, analyzerData['rules.empty.total'])
    console.log(`📉[${site.title}] Min selectors per rule: `, analyzerData['rules.selectors.min'])
    console.log(`📉[${site.title}] Max selectors per rule: `, analyzerData['rules.selectors.max'])
    console.log(`📉[${site.title}] Average selectors per rule: `, analyzerData['rules.selectors.average'].toFixed(2))

    resolve()
  })
}

const atRulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER @ RULES')

    console.log(`📉[${site.title}] Total charset rules: `, analyzerData['atrules.charsets.total'])
    console.log(`📉[${site.title}] Total unique charset rules: `, analyzerData['atrules.charsets.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique charset rules: `, `${(analyzerData['atrules.charsets.totalUnique'] === 0 || analyzerData['atrules.charsets.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.charsets.totalUnique'] / analyzerData['atrules.charsets.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total document rules: `, analyzerData['atrules.documents.total'])
    console.log(`📉[${site.title}] Total unique document rules: `, analyzerData['atrules.documents.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique document rules: `, `${(analyzerData['atrules.documents.totalUnique'] === 0 || analyzerData['atrules.documents.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.documents.totalUnique'] / analyzerData['atrules.documents.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total fontface rules: `, analyzerData['atrules.fontfaces.total'])
    console.log(`📉[${site.title}] Total unique fontface rules: `, analyzerData['atrules.fontfaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique fontface rules: `, `${(analyzerData['atrules.fontfaces.totalUnique'] === 0 || analyzerData['atrules.fontfaces.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.fontfaces.totalUnique'] / analyzerData['atrules.fontfaces.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total import rules: `, analyzerData['atrules.imports.total'])
    console.log(`📉[${site.title}] Total unique import rules: `, analyzerData['atrules.imports.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique import rules: `, `${(analyzerData['atrules.imports.totalUnique'] === 0 || analyzerData['atrules.imports.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.imports.totalUnique'] / analyzerData['atrules.imports.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total keyframes rules: `, analyzerData['atrules.keyframes.total'])
    console.log(`📉[${site.title}] Total unique keyframes rules: `, analyzerData['atrules.keyframes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique keyframes rules: `, `${(analyzerData['atrules.keyframes.totalUnique'] === 0 || analyzerData['atrules.keyframes.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.keyframes.totalUnique'] / analyzerData['atrules.keyframes.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total media queries rules: `, analyzerData['atrules.mediaqueries.total'])
    console.log(`📉[${site.title}] Total unique media queries rules: `, analyzerData['atrules.mediaqueries.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique media queries rules: `, `${(analyzerData['atrules.mediaqueries.totalUnique'] === 0 || analyzerData['atrules.mediaqueries.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.mediaqueries.totalUnique'] / analyzerData['atrules.mediaqueries.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total namespace rules: `, analyzerData['atrules.namespaces.total'])
    console.log(`📉[${site.title}] Total unique namespace rules: `, analyzerData['atrules.namespaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique namespace rules: `, `${(analyzerData['atrules.namespaces.totalUnique'] === 0 || analyzerData['atrules.namespaces.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.namespaces.totalUnique'] / analyzerData['atrules.namespaces.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total page rules: `, analyzerData['atrules.pages.total'])
    console.log(`📉[${site.title}] Total unique page rules: `, analyzerData['atrules.pages.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique page rules: `, `${(analyzerData['atrules.pages.totalUnique'] === 0 || analyzerData['atrules.pages.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.pages.totalUnique'] / analyzerData['atrules.pages.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack @ rules: `, `${(analyzerData['atrules.supports.browserhacks.totalUnique'] === 0 || analyzerData['atrules.supports.browserhacks.total'] === 0) ? 0 : parseFloat(analyzerData['atrules.supports.browserhacks.totalUnique'] / analyzerData['atrules.supports.browserhacks.total'] * 100).toFixed(2)}`)

    resolve()
  })
}

const selectorsReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER SELECTORS')

    console.log(`📉[${site.title}] Total selectors: `, analyzerData['selectors.total'])
    console.log(`📉[${site.title}] Total unique selectors: `, analyzerData['selectors.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique selectors: `, `${parseFloat(analyzerData['selectors.totalUnique'] / analyzerData['selectors.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total universal selectors: `, analyzerData['selectors.universal.total'])
    console.log(`📉[${site.title}] Total unique universal selectors: `, analyzerData['selectors.universal.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique universal selectors: `, analyzerData['selectors.universal.total'] > 0 ? `${parseFloat(analyzerData['selectors.universal.totalUnique'] / analyzerData['selectors.universal.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`📉[${site.title}] Total ID selectors: `, analyzerData['selectors.id.total'])
    console.log(`📉[${site.title}] Total unique ID selectors: `, analyzerData['selectors.id.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique ID selectors: `, analyzerData['selectors.id.total'] > 0 ? `${parseFloat(analyzerData['selectors.id.totalUnique'] / analyzerData['selectors.id.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`📉[${site.title}] Total JavaScript selectors: `, analyzerData['selectors.js.total'])
    console.log(`📉[${site.title}] Total unique JavaScript selectors: `, analyzerData['selectors.js.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique JavaScript selectors: `, analyzerData['selectors.js.total'] > 0 ? `${parseFloat(analyzerData['selectors.js.totalUnique'] / analyzerData['selectors.js.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`📉[${site.title}] Total accessibility selectors: `, analyzerData['selectors.accessibility.total'])
    console.log(`📉[${site.title}] Total unique accessibility selectors: `, analyzerData['selectors.accessibility.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique accessibility selectors: `, analyzerData['selectors.accessibility.total'] > 0 ? `${parseFloat(analyzerData['selectors.accessibility.totalUnique'] / analyzerData['selectors.accessibility.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`📉[${site.title}] Total browser hack selectors: `, analyzerData['selectors.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack selectors: `, analyzerData['selectors.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack selectors: `, analyzerData['selectors.browserhacks.total'] > 0 ? `${parseFloat(analyzerData['selectors.browserhacks.totalUnique'] / analyzerData['selectors.browserhacks.total'] * 100).toFixed(2)}` : 0)

    const regularSelectors = analyzerData['selectors.total'] - (analyzerData['selectors.universal.total'] + analyzerData['selectors.id.total'] + analyzerData['selectors.js.total'] + analyzerData['selectors.accessibility.total'] + analyzerData['selectors.browserhacks.total'])

    console.log('')
    console.log(`📉[${site.title}] Total regular selectors: `, regularSelectors)
    console.log(`📉[${site.title}] Percent of regular selectors: `, `${parseFloat(regularSelectors / analyzerData['selectors.total'] * 100).toFixed(2)}`)

    // const totalSpecificity = specificityData.reduce((a, b) => a + b.specificity || 0, 0)
    // console.log(specificityData[0], totalSpecificity, specificityData.length, analyzerData['selectors.total'])
    // console.log(totalSpecificity/specificityData.length)

    console.log('')
    console.log(`📉[${site.title}] Max specificity: `, `${analyzerData['selectors.specificity.max.value.a']}${analyzerData['selectors.specificity.max.value.b']}${analyzerData['selectors.specificity.max.value.c']}${analyzerData['selectors.specificity.max.value.d']}`)
    // console.log(`📉[${site.title}] Average specificity: `, `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

    console.log('')
    console.log(`📉[${site.title}] Average identifiers per rule: `, analyzerData['selectors.identifiers.average'].toFixed(2))
    // console.log(`📉[${site.title}] Max identifiers value: `, analyzerData['selectors.identifiers.max.value'])
    // console.log(`📉[${site.title}] Max identifiers: `, analyzerData['selectors.identifiers.max.count'])

    console.log('')
    console.log(`📉[${site.title}] Average complexity per selector: `, analyzerData['selectors.complexity.average'].toFixed(2))
    // console.log(`📉[${site.title}] Max complexity value: `, analyzerData['selectors.complexity.max.value'])
    // console.log(`📉[${site.title}] Max complexity: `, analyzerData['selectors.complexity.max.count'])
    // console.log(`📉[${site.title}] Max complexity selectors: `, analyzerData['selectors.complexity.max.selectors'])
    console.log(`📉[${site.title}] Max complexity: `, analyzerData['selectors.complexity.sum'])
    // console.log(`📉[${site.title}] ? Max complexity unique: `, analyzerData['selectors.complexity.unique'])
    console.log(`📉[${site.title}] Max complexity total unique: `, analyzerData['selectors.complexity.totalUnique'])
    // console.log(`📉[${site.title}] Average specificity: `, `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

    resolve()
  })
}

const propertiesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER PROPERTIES')

    console.log(`📉[${site.title}] Total properties: `, analyzerData['properties.total'])
    console.log(`📉[${site.title}] Total unique properties: `, analyzerData['properties.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique properties: `, `${(analyzerData['properties.totalUnique'] === 0 || analyzerData['properties.total'] === 0) ? 0 : parseFloat(analyzerData['properties.totalUnique'] / analyzerData['properties.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total prefixed properties: `, analyzerData['properties.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed properties: `, analyzerData['properties.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed properties: `, `${(analyzerData['properties.prefixed.totalUnique'] === 0 || analyzerData['properties.prefixed.total'] === 0) ? 0 : parseFloat(analyzerData['properties.prefixed.totalUnique'] / analyzerData['properties.prefixed.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total browser hack properties: `, analyzerData['properties.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack properties: `, analyzerData['properties.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack properties: `, `${(analyzerData['properties.browserhacks.totalUnique'] === 0 || analyzerData['properties.browserhacks.total'] === 0) ? 0 : parseFloat(analyzerData['properties.browserhacks.totalUnique'] / analyzerData['properties.browserhacks.total'] * 100).toFixed(2)}`)

    resolve()
  })
}

const valuesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = files.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER VALUES')

    console.log(`📉[${site.title}] Total values: `, analyzerData['values.total'])

    console.log('')
    console.log(`📉[${site.title}] Total prefixed values: `, analyzerData['values.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed values: `, analyzerData['values.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed values: `, `${(analyzerData['values.prefixed.totalUnique'] === 0 || analyzerData['values.prefixed.total'] === 0) ? 0 : parseFloat(analyzerData['values.prefixed.totalUnique'] / analyzerData['values.prefixed.total'] * 100).toFixed(2)}`)
    console.log(`📉[${site.title}] Percent of prefixed values: `, (analyzerData['values.prefixed.share'] * 100).toFixed(2))

    console.log('')
    console.log(`📉[${site.title}] Total font size values: `, analyzerData['values.fontsizes.total'])
    console.log(`📉[${site.title}] Total unique font size values: `, analyzerData['values.fontsizes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font size values: `, `${(analyzerData['values.fontsizes.totalUnique'] === 0 || analyzerData['values.fontsizes.total'] === 0) ? 0 : parseFloat(analyzerData['values.fontsizes.totalUnique'] / analyzerData['values.fontsizes.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total font family values: `, analyzerData['values.fontfamilies.total'])
    console.log(`📉[${site.title}] Total unique font family values: `, analyzerData['values.fontfamilies.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font family values: `, `${(analyzerData['values.fontfamilies.totalUnique'] === 0 || analyzerData['values.fontfamilies.total'] === 0) ? 0 : parseFloat(analyzerData['values.fontfamilies.totalUnique'] / analyzerData['values.fontfamilies.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total color values: `, analyzerData['values.colors.total'])
    console.log(`📉[${site.title}] Total unique color values: `, analyzerData['values.colors.totalUnique'])
    console.log(`📉[${site.title}] Total duplicate color values: `, analyzerData['values.colors.duplicates.total'])
    console.log(`📉[${site.title}] Percent of unique color values: `, `${(analyzerData['values.colors.totalUnique'] === 0 || analyzerData['values.colors.total'] === 0) ? 0 : parseFloat(analyzerData['values.colors.totalUnique'] / analyzerData['values.colors.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total z-index values: `, analyzerData['values.zindexes.total'])
    console.log(`📉[${site.title}] Total unique z-index values: `, analyzerData['values.zindexes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique z-index values: `, `${(analyzerData['values.zindexes.totalUnique'] === 0 || analyzerData['values.zindexes.total'] === 0) ? 0 : parseFloat(analyzerData['values.zindexes.totalUnique'] / analyzerData['values.zindexes.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total box shadow values: `, analyzerData['values.boxshadows.total'])
    console.log(`📉[${site.title}] Total unique box shadow values: `, analyzerData['values.boxshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique box shadow values: `, `${(analyzerData['values.boxshadows.totalUnique'] === 0 || analyzerData['values.boxshadows.total'] === 0) ? 0 : parseFloat(analyzerData['values.boxshadows.totalUnique'] / analyzerData['values.boxshadows.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total text shadow values: `, analyzerData['values.textshadows.total'])
    console.log(`📉[${site.title}] Total unique text shadow values: `, analyzerData['values.textshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique text shadow values: `, `${(analyzerData['values.textshadows.totalUnique'] === 0 || analyzerData['values.textshadows.total'] === 0) ? 0 : parseFloat(analyzerData['values.textshadows.totalUnique'] / analyzerData['values.textshadows.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total animation duration values: `, analyzerData['values.animations.durations.total'])
    console.log(`📉[${site.title}] Total unique animation duration values: `, analyzerData['values.animations.durations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation duration values: `, `${(analyzerData['values.animations.durations.totalUnique'] === 0 || analyzerData['values.animations.durations.total'] === 0) ? 0 : parseFloat(analyzerData['values.animations.durations.totalUnique'] / analyzerData['values.animations.durations.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total animation timing function values: `, analyzerData['values.animations.timingFunctions.total'])
    console.log(`📉[${site.title}] Total unique animation timing function values: `, analyzerData['values.animations.timingFunctions.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation timing function values: `, `${(analyzerData['values.animations.timingFunctions.totalUnique'] === 0 || analyzerData['values.animations.timingFunctions.total'] === 0) ? 0 : parseFloat(analyzerData['values.animations.timingFunctions.totalUnique'] / analyzerData['values.animations.timingFunctions.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`📉[${site.title}] Total browser hack values: `, analyzerData['values.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack values: `, analyzerData['values.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack values: `, `${(analyzerData['values.browserhacks.totalUnique'] === 0 || analyzerData['values.browserhacks.total'] === 0) ? 0 : parseFloat(analyzerData['values.browserhacks.totalUnique'] / analyzerData['values.browserhacks.total'] * 100).toFixed(2)}`)

    resolve()
  })
}

const analyzerReport = async (site) => {
  await stylesheetReport(site)
  await declarationsReport(site)
  await rulesReport(site)
  await atRulesReport(site)
  await selectorsReport(site)
  await propertiesReport(site)
  await valuesReport(site)
}

module.exports = {
  stylesheetReport,
  declarationsReport,
  rulesReport,
  atRulesReport,
  selectorsReport,
  propertiesReport,
  valuesReport,
  analyzerReport,
}

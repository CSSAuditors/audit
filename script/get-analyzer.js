const helpers = require('./helpers')
const { getPercent, getRound } = require('./calc')

const stylesheetReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
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
    console.log(`📉[${site.title}] Percent of unique browser hack rules: `, getPercent(analyzerData['stylesheets.browserhacks.totalUnique'], analyzerData['stylesheets.browserhacks.total']))

    resolve()
  })
}

const declarationsReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER DECLARATIONS')

    console.log(`📉[${site.title}] Total declarations: `, analyzerData['declarations.total'])
    console.log(`📉[${site.title}] Total unique declarations: `, analyzerData['declarations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique declarations: `, getPercent(analyzerData['declarations.totalUnique'], analyzerData['declarations.total']))

    console.log('')
    console.log(`📉[${site.title}] Total !important rules: `, analyzerData['declarations.importants.total'])
    console.log(`📉[${site.title}] Total !important share: `, getRound(analyzerData['declarations.importants.share'] * 100))

    resolve()
  })
}

const rulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER RULES')

    console.log(`📉[${site.title}] Total rules: `, analyzerData['rules.total'])
    console.log(`📉[${site.title}] Total empty rules: `, analyzerData['rules.empty.total'])
    console.log(`📉[${site.title}] Min selectors per rule: `, analyzerData['rules.selectors.min'])
    console.log(`📉[${site.title}] Max selectors per rule: `, analyzerData['rules.selectors.max'])
    console.log(`📉[${site.title}] Average selectors per rule: `, getRound(analyzerData['rules.selectors.average']))

    resolve()
  })
}

const atRulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER @ RULES')

    console.log(`📉[${site.title}] Total charset rules: `, analyzerData['atrules.charsets.total'])
    console.log(`📉[${site.title}] Total unique charset rules: `, analyzerData['atrules.charsets.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique charset rules: `, getPercent(analyzerData['atrules.charsets.totalUnique'], analyzerData['atrules.charsets.total']))

    console.log('')
    console.log(`📉[${site.title}] Total document rules: `, analyzerData['atrules.documents.total'])
    console.log(`📉[${site.title}] Total unique document rules: `, analyzerData['atrules.documents.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique document rules: `, getPercent(analyzerData['atrules.documents.totalUnique'], analyzerData['atrules.documents.total']))

    console.log('')
    console.log(`📉[${site.title}] Total fontface rules: `, analyzerData['atrules.fontfaces.total'])
    console.log(`📉[${site.title}] Total unique fontface rules: `, analyzerData['atrules.fontfaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique fontface rules: `, getPercent(analyzerData['atrules.fontfaces.totalUnique'], analyzerData['atrules.fontfaces.total']))

    console.log('')
    console.log(`📉[${site.title}] Total import rules: `, analyzerData['atrules.imports.total'])
    console.log(`📉[${site.title}] Total unique import rules: `, analyzerData['atrules.imports.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique import rules: `, getPercent(analyzerData['atrules.imports.totalUnique'], analyzerData['atrules.imports.total']))

    console.log('')
    console.log(`📉[${site.title}] Total keyframes rules: `, analyzerData['atrules.keyframes.total'])
    console.log(`📉[${site.title}] Total unique keyframes rules: `, analyzerData['atrules.keyframes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique keyframes rules: `, getPercent(analyzerData['atrules.keyframes.totalUnique'], analyzerData['atrules.keyframes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total media queries rules: `, analyzerData['atrules.mediaqueries.total'])
    console.log(`📉[${site.title}] Total unique media queries rules: `, analyzerData['atrules.mediaqueries.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique media queries rules: `, getPercent(analyzerData['atrules.mediaqueries.totalUnique'], analyzerData['atrules.mediaqueries.total']))

    console.log('')
    console.log(`📉[${site.title}] Total namespace rules: `, analyzerData['atrules.namespaces.total'])
    console.log(`📉[${site.title}] Total unique namespace rules: `, analyzerData['atrules.namespaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique namespace rules: `, getPercent(analyzerData['atrules.namespaces.totalUnique'], analyzerData['atrules.namespaces.total']))

    console.log('')
    console.log(`📉[${site.title}] Total page rules: `, analyzerData['atrules.pages.total'])
    console.log(`📉[${site.title}] Total unique page rules: `, analyzerData['atrules.pages.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique page rules: `, getPercent(analyzerData['atrules.pages.totalUnique'], analyzerData['atrules.pages.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack @ rules: `, getPercent(analyzerData['atrules.supports.browserhacks.totalUnique'], analyzerData['atrules.supports.browserhacks.total']))

    resolve()
  })
}

const selectorsReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER SELECTORS')

    console.log(`📉[${site.title}] Total selectors: `, analyzerData['selectors.total'])
    console.log(`📉[${site.title}] Total unique selectors: `, analyzerData['selectors.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique selectors: `, getPercent(analyzerData['selectors.totalUnique'], analyzerData['selectors.total']))

    console.log('')
    console.log(`📉[${site.title}] Total universal selectors: `, analyzerData['selectors.universal.total'])
    console.log(`📉[${site.title}] Total unique universal selectors: `, analyzerData['selectors.universal.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique universal selectors: `, getPercent(analyzerData['selectors.universal.totalUnique'], analyzerData['selectors.universal.total']))

    console.log('')
    console.log(`📉[${site.title}] Total ID selectors: `, analyzerData['selectors.id.total'])
    console.log(`📉[${site.title}] Total unique ID selectors: `, analyzerData['selectors.id.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique ID selectors: `, getPercent(analyzerData['selectors.id.totalUnique'], analyzerData['selectors.id.total']))

    console.log('')
    console.log(`📉[${site.title}] Total JavaScript selectors: `, analyzerData['selectors.js.total'])
    console.log(`📉[${site.title}] Total unique JavaScript selectors: `, analyzerData['selectors.js.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique JavaScript selectors: `, getPercent(analyzerData['selectors.js.totalUnique'], analyzerData['selectors.js.total']))

    console.log('')
    console.log(`📉[${site.title}] Total accessibility selectors: `, analyzerData['selectors.accessibility.total'])
    console.log(`📉[${site.title}] Total unique accessibility selectors: `, analyzerData['selectors.accessibility.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique accessibility selectors: `, getPercent(analyzerData['selectors.accessibility.totalUnique'], analyzerData['selectors.accessibility.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack selectors: `, analyzerData['selectors.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack selectors: `, analyzerData['selectors.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack selectors: `, getPercent(analyzerData['selectors.browserhacks.totalUnique'], analyzerData['selectors.browserhacks.total']))

    const regularSelectors = analyzerData['selectors.total'] - (analyzerData['selectors.universal.total'] + analyzerData['selectors.id.total'] + analyzerData['selectors.js.total'] + analyzerData['selectors.accessibility.total'] + analyzerData['selectors.browserhacks.total'])

    console.log('')
    console.log(`📉[${site.title}] Total regular selectors: `, regularSelectors)
    console.log(`📉[${site.title}] Percent of regular selectors: `, getPercent(regularSelectors, analyzerData['selectors.total']))

    // const totalSpecificity = specificityData.reduce((a, b) => a + b.specificity || 0, 0)
    // console.log(specificityData[0], totalSpecificity, specificityData.length, analyzerData['selectors.total'])
    // console.log(totalSpecificity/specificityData.length)

    console.log('')
    console.log(`📉[${site.title}] Max specificity: `, `${analyzerData['selectors.specificity.max.value.a']}${analyzerData['selectors.specificity.max.value.b']}${analyzerData['selectors.specificity.max.value.c']}${analyzerData['selectors.specificity.max.value.d']}`)
    // console.log(`📉[${site.title}] Average specificity: `, `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

    console.log('')
    console.log(`📉[${site.title}] Average identifiers per rule: `, getRound(analyzerData['selectors.identifiers.average']))
    // console.log(`📉[${site.title}] Max identifiers value: `, analyzerData['selectors.identifiers.max.value'])
    // console.log(`📉[${site.title}] Max identifiers: `, analyzerData['selectors.identifiers.max.count'])

    console.log('')
    console.log(`📉[${site.title}] Average complexity per selector: `, getRound(analyzerData['selectors.complexity.average']))
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
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER PROPERTIES')

    console.log(`📉[${site.title}] Total properties: `, analyzerData['properties.total'])
    console.log(`📉[${site.title}] Total unique properties: `, analyzerData['properties.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique properties: `, getPercent(analyzerData['properties.totalUnique'], analyzerData['properties.total']))

    console.log('')
    console.log(`📉[${site.title}] Total prefixed properties: `, analyzerData['properties.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed properties: `, analyzerData['properties.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed properties: `, getPercent(analyzerData['properties.prefixed.totalUnique'], analyzerData['properties.prefixed.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack properties: `, analyzerData['properties.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack properties: `, analyzerData['properties.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack properties: `, getPercent(analyzerData['properties.browserhacks.totalUnique'], analyzerData['properties.browserhacks.total']))

    resolve()
  })
}

const valuesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER VALUES')

    console.log(`📉[${site.title}] Total values: `, analyzerData['values.total'])

    console.log('')
    console.log(`📉[${site.title}] Total prefixed values: `, analyzerData['values.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed values: `, analyzerData['values.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed values: `, getPercent(analyzerData['values.prefixed.totalUnique'], analyzerData['values.prefixed.total']))
    console.log(`📉[${site.title}] Percent of prefixed values: `, (analyzerData['values.prefixed.share'] * 100).toFixed(2))

    console.log('')
    console.log(`📉[${site.title}] Total font size values: `, analyzerData['values.fontsizes.total'])
    console.log(`📉[${site.title}] Total unique font size values: `, analyzerData['values.fontsizes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font size values: `, getPercent(analyzerData['values.fontsizes.totalUnique'], analyzerData['values.fontsizes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total font family values: `, analyzerData['values.fontfamilies.total'])
    console.log(`📉[${site.title}] Total unique font family values: `, analyzerData['values.fontfamilies.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font family values: `, getPercent(analyzerData['values.fontfamilies.totalUnique'], analyzerData['values.fontfamilies.total']))

    console.log('')
    console.log(`📉[${site.title}] Total color values: `, analyzerData['values.colors.total'])
    console.log(`📉[${site.title}] Total unique color values: `, analyzerData['values.colors.totalUnique'])
    console.log(`📉[${site.title}] Total duplicate color values: `, analyzerData['values.colors.duplicates.total'])
    console.log(`📉[${site.title}] Percent of unique color values: `, getPercent(analyzerData['values.colors.totalUnique'], analyzerData['values.colors.total']))

    console.log('')
    console.log(`📉[${site.title}] Total z-index values: `, analyzerData['values.zindexes.total'])
    console.log(`📉[${site.title}] Total unique z-index values: `, analyzerData['values.zindexes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique z-index values: `, getPercent(analyzerData['values.zindexes.totalUnique'], analyzerData['values.zindexes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total box shadow values: `, analyzerData['values.boxshadows.total'])
    console.log(`📉[${site.title}] Total unique box shadow values: `, analyzerData['values.boxshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique box shadow values: `, getPercent(analyzerData['values.boxshadows.totalUnique'], analyzerData['values.boxshadows.total']))

    console.log('')
    console.log(`📉[${site.title}] Total text shadow values: `, analyzerData['values.textshadows.total'])
    console.log(`📉[${site.title}] Total unique text shadow values: `, analyzerData['values.textshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique text shadow values: `, getPercent(analyzerData['values.textshadows.totalUnique'], analyzerData['values.textshadows.total']))

    console.log('')
    console.log(`📉[${site.title}] Total animation duration values: `, analyzerData['values.animations.durations.total'])
    console.log(`📉[${site.title}] Total unique animation duration values: `, analyzerData['values.animations.durations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation duration values: `, getPercent(analyzerData['values.animations.durations.totalUnique'], analyzerData['values.animations.durations.total']))

    console.log('')
    console.log(`📉[${site.title}] Total animation timing function values: `, analyzerData['values.animations.timingFunctions.total'])
    console.log(`📉[${site.title}] Total unique animation timing function values: `, analyzerData['values.animations.timingFunctions.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation timing function values: `, getPercent(analyzerData['values.animations.timingFunctions.totalUnique'], analyzerData['values.animations.timingFunctions.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack values: `, analyzerData['values.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack values: `, analyzerData['values.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack values: `, getPercent(analyzerData['values.browserhacks.totalUnique'], analyzerData['values.browserhacks.total']))

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

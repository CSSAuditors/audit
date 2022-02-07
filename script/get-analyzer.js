const helpers = require('./helpers')
const calc = require('./calc')
const { compareSpecificity } = require('@projectwallace/css-analyzer')

const getStylesheetReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    analyzerData.stylesheet.site = site

    if(!silent) {
      console.log('')
      console.log('ANALYZER STYLESHEET')

      console.log(`📉[${site.title}] Total source lines of code: ${analyzerData.stylesheet.sourceLinesOfCode}`)
      console.log(`📉[${site.title}] Total lines of source code: ${analyzerData.stylesheet.linesOfCode}`)
      console.log(`📉[${site.title}] File size: ${analyzerData.stylesheet.size}`)
      console.log(`📉[${site.title}] Total number of comments: ${analyzerData.stylesheet.comments.total}`)
      console.log(`📉[${site.title}] Total comments size: ${analyzerData.stylesheet.comments.size}`)
    }

    resolve(analyzerData.stylesheet)
  })
}

const rulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER RULES')

    console.log(`📉[${site.title}] Total rules: `, analyzerData['rules.total'])
    console.log(`📉[${site.title}] Total empty rules: `, analyzerData['rules.empty.total'])
    console.log(`📉[${site.title}] Min selectors per rule: `, analyzerData['rules.selectors.min'])
    console.log(`📉[${site.title}] Max selectors per rule: `, analyzerData['rules.selectors.max'])
    console.log(`📉[${site.title}] Average selectors per rule: `, calc.getRound(analyzerData['rules.selectors.average']))

    resolve()
  })
}

const atRulesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER @ RULES')

    console.log(`📉[${site.title}] Total charset rules: `, analyzerData['atrules.charsets.total'])
    console.log(`📉[${site.title}] Total unique charset rules: `, analyzerData['atrules.charsets.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique charset rules: `, calc.getPercent(analyzerData['atrules.charsets.totalUnique'], analyzerData['atrules.charsets.total']))

    console.log('')
    console.log(`📉[${site.title}] Total document rules: `, analyzerData['atrules.documents.total'])
    console.log(`📉[${site.title}] Total unique document rules: `, analyzerData['atrules.documents.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique document rules: `, calc.getPercent(analyzerData['atrules.documents.totalUnique'], analyzerData['atrules.documents.total']))

    console.log('')
    console.log(`📉[${site.title}] Total fontface rules: `, analyzerData['atrules.fontfaces.total'])
    console.log(`📉[${site.title}] Total unique fontface rules: `, analyzerData['atrules.fontfaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique fontface rules: `, calc.getPercent(analyzerData['atrules.fontfaces.totalUnique'], analyzerData['atrules.fontfaces.total']))

    console.log('')
    console.log(`📉[${site.title}] Total import rules: `, analyzerData['atrules.imports.total'])
    console.log(`📉[${site.title}] Total unique import rules: `, analyzerData['atrules.imports.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique import rules: `, calc.getPercent(analyzerData['atrules.imports.totalUnique'], analyzerData['atrules.imports.total']))

    console.log('')
    console.log(`📉[${site.title}] Total keyframes rules: `, analyzerData['atrules.keyframes.total'])
    console.log(`📉[${site.title}] Total unique keyframes rules: `, analyzerData['atrules.keyframes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique keyframes rules: `, calc.getPercent(analyzerData['atrules.keyframes.totalUnique'], analyzerData['atrules.keyframes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total media queries rules: `, analyzerData['atrules.mediaqueries.total'])
    console.log(`📉[${site.title}] Total unique media queries rules: `, analyzerData['atrules.mediaqueries.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique media queries rules: `, calc.getPercent(analyzerData['atrules.mediaqueries.totalUnique'], analyzerData['atrules.mediaqueries.total']))

    console.log('')
    console.log(`📉[${site.title}] Total namespace rules: `, analyzerData['atrules.namespaces.total'])
    console.log(`📉[${site.title}] Total unique namespace rules: `, analyzerData['atrules.namespaces.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique namespace rules: `, calc.getPercent(analyzerData['atrules.namespaces.totalUnique'], analyzerData['atrules.namespaces.total']))

    console.log('')
    console.log(`📉[${site.title}] Total page rules: `, analyzerData['atrules.pages.total'])
    console.log(`📉[${site.title}] Total unique page rules: `, analyzerData['atrules.pages.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique page rules: `, calc.getPercent(analyzerData['atrules.pages.totalUnique'], analyzerData['atrules.pages.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack @ rules: `, analyzerData['atrules.supports.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack @ rules: `, calc.getPercent(analyzerData['atrules.supports.browserhacks.totalUnique'], analyzerData['atrules.supports.browserhacks.total']))

    resolve()
  })
}

const getSelectorsReport = async (site, silent) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    analyzerData.selectors.site = site

    if(!silent) {
      console.log('')
      console.log('ANALYZER SELECTORS')

      console.log(`📉[${site.title}] Total selectors: ${analyzerData.selectors.total}`)
      console.log(`📉[${site.title}] Total unique selectors: ${analyzerData.selectors.totalUnique}`)
      console.log(`📉[${site.title}] Percent of unique selectors: ${analyzerData.selectors.uniquenessRatio}`)
      console.log(`📉[${site.title}] Total ID selectors: ${analyzerData.selectors.id.total}`)
      console.log(`📉[${site.title}] Total unique ID selectors: ${analyzerData.selectors.id.totalUnique}`)
      console.log(`📉[${site.title}] Percent of unique ID selectors: ${analyzerData.selectors.id.uniquenessRatio}`)
      console.log(`📉[${site.title}] Total accessibility selectors: ${analyzerData.selectors.accessibility.total}`)
      console.log(`📉[${site.title}] Total unique accessibility selectors: ${analyzerData.selectors.accessibility.totalUnique}`)
      console.log(`📉[${site.title}] Percent of unique accessibility selectors: ${analyzerData.selectors.accessibility.uniquenessRatio}`)
      console.log(`📉[${site.title}] Total keyframes selectors: ${analyzerData.selectors.keyframes.total}`)
      console.log(`📉[${site.title}] Total unique keyframes selectors: ${analyzerData.selectors.keyframes.totalUnique}`)
      console.log(`📉[${site.title}] Percent of unique keyframes selectors: ${analyzerData.selectors.keyframes.uniquenessRatio}`)
      console.log(`📉[${site.title}] Min specificity: ${analyzerData.selectors.specificity.min}`)
      console.log(`📉[${site.title}] Max specificity: ${analyzerData.selectors.specificity.max}`)
      console.log(`📉[${site.title}] Median specificity: ${analyzerData.selectors.specificity.median}`)
      console.log(`📉[${site.title}] Min complexity: ${analyzerData.selectors.complexity.min}`)
      console.log(`📉[${site.title}] Max complexity: ${analyzerData.selectors.complexity.max}`)
      console.log(`📉[${site.title}] Median complexity: ${analyzerData.selectors.complexity.median}`)
    }

    resolve(analyzerData.selectors)
  })
}

const declarationsReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER DECLARATIONS')

    console.log(`📉[${site.title}] Total declarations: `, analyzerData['declarations.total'])
    console.log(`📉[${site.title}] Total unique declarations: `, analyzerData['declarations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique declarations: `, calc.getPercent(analyzerData['declarations.totalUnique'], analyzerData['declarations.total']))

    console.log('')
    console.log(`📉[${site.title}] Total !important rules: `, analyzerData['declarations.importants.total'])
    console.log(`📉[${site.title}] Total !important share: `, calc.getRound(analyzerData['declarations.importants.share'] * 100))

    resolve()
  })
}

const propertiesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER PROPERTIES')

    console.log(`📉[${site.title}] Total properties: `, analyzerData['properties.total'])
    console.log(`📉[${site.title}] Total unique properties: `, analyzerData['properties.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique properties: `, calc.getPercent(analyzerData['properties.totalUnique'], analyzerData['properties.total']))

    console.log('')
    console.log(`📉[${site.title}] Total prefixed properties: `, analyzerData['properties.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed properties: `, analyzerData['properties.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed properties: `, calc.getPercent(analyzerData['properties.prefixed.totalUnique'], analyzerData['properties.prefixed.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack properties: `, analyzerData['properties.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack properties: `, analyzerData['properties.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack properties: `, calc.getPercent(analyzerData['properties.browserhacks.totalUnique'], analyzerData['properties.browserhacks.total']))

    resolve()
  })
}

const valuesReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = helpers.getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!helpers.fileExists(analyzerFile)) {
      resolve(false)
    }

    const analyzerRaw = await helpers.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')
    console.log('ANALYZER VALUES')

    console.log(`📉[${site.title}] Total values: `, analyzerData['values.total'])

    console.log('')
    console.log(`📉[${site.title}] Total prefixed values: `, analyzerData['values.prefixed.total'])
    console.log(`📉[${site.title}] Total unique prefixed values: `, analyzerData['values.prefixed.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique prefixed values: `, calc.getPercent(analyzerData['values.prefixed.totalUnique'], analyzerData['values.prefixed.total']))
    console.log(`📉[${site.title}] Percent of prefixed values: `, (analyzerData['values.prefixed.share'] * 100).toFixed(2))

    console.log('')
    console.log(`📉[${site.title}] Total font size values: `, analyzerData['values.fontsizes.total'])
    console.log(`📉[${site.title}] Total unique font size values: `, analyzerData['values.fontsizes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font size values: `, calc.getPercent(analyzerData['values.fontsizes.totalUnique'], analyzerData['values.fontsizes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total font family values: `, analyzerData['values.fontfamilies.total'])
    console.log(`📉[${site.title}] Total unique font family values: `, analyzerData['values.fontfamilies.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique font family values: `, calc.getPercent(analyzerData['values.fontfamilies.totalUnique'], analyzerData['values.fontfamilies.total']))

    console.log('')
    console.log(`📉[${site.title}] Total color values: `, analyzerData['values.colors.total'])
    console.log(`📉[${site.title}] Total unique color values: `, analyzerData['values.colors.totalUnique'])
    console.log(`📉[${site.title}] Total duplicate color values: `, analyzerData['values.colors.duplicates.total'])
    console.log(`📉[${site.title}] Percent of unique color values: `, calc.getPercent(analyzerData['values.colors.totalUnique'], analyzerData['values.colors.total']))

    console.log('')
    console.log(`📉[${site.title}] Total z-index values: `, analyzerData['values.zindexes.total'])
    console.log(`📉[${site.title}] Total unique z-index values: `, analyzerData['values.zindexes.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique z-index values: `, calc.getPercent(analyzerData['values.zindexes.totalUnique'], analyzerData['values.zindexes.total']))

    console.log('')
    console.log(`📉[${site.title}] Total box shadow values: `, analyzerData['values.boxshadows.total'])
    console.log(`📉[${site.title}] Total unique box shadow values: `, analyzerData['values.boxshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique box shadow values: `, calc.getPercent(analyzerData['values.boxshadows.totalUnique'], analyzerData['values.boxshadows.total']))

    console.log('')
    console.log(`📉[${site.title}] Total text shadow values: `, analyzerData['values.textshadows.total'])
    console.log(`📉[${site.title}] Total unique text shadow values: `, analyzerData['values.textshadows.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique text shadow values: `, calc.getPercent(analyzerData['values.textshadows.totalUnique'], analyzerData['values.textshadows.total']))

    console.log('')
    console.log(`📉[${site.title}] Total animation duration values: `, analyzerData['values.animations.durations.total'])
    console.log(`📉[${site.title}] Total unique animation duration values: `, analyzerData['values.animations.durations.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation duration values: `, calc.getPercent(analyzerData['values.animations.durations.totalUnique'], analyzerData['values.animations.durations.total']))

    console.log('')
    console.log(`📉[${site.title}] Total animation timing function values: `, analyzerData['values.animations.timingFunctions.total'])
    console.log(`📉[${site.title}] Total unique animation timing function values: `, analyzerData['values.animations.timingFunctions.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique animation timing function values: `, calc.getPercent(analyzerData['values.animations.timingFunctions.totalUnique'], analyzerData['values.animations.timingFunctions.total']))

    console.log('')
    console.log(`📉[${site.title}] Total browser hack values: `, analyzerData['values.browserhacks.total'])
    console.log(`📉[${site.title}] Total unique browser hack values: `, analyzerData['values.browserhacks.totalUnique'])
    console.log(`📉[${site.title}] Percent of unique browser hack values: `, calc.getPercent(analyzerData['values.browserhacks.totalUnique'], analyzerData['values.browserhacks.total']))

    resolve()
  })
}

const stylesheetReports = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const stylesheetFile = `${root}/site/_data/${name}-analyzer-stylesheet.json`

  if(!helpers.fileExists(stylesheetFile) && sites.list) {
    const stylesheetData = {
      list: []
    }

    for(const site of sites.list) {
      if(!site.css) {
        stylesheetData.list.push({...await getStylesheetReport(site, silent)})
      }
    }

    if(!stylesheetData.list.length) {
      return false
    }

    stylesheetData.maxSourceLinesOfCode = calc.getMax(stylesheetData.list, 'sourceLinesOfCode')
    stylesheetData.minSourceLinesOfCode = calc.getMin(stylesheetData.list, 'sourceLinesOfCode')
    stylesheetData.avgSourceLinesOfCode = calc.getAverage(stylesheetData.list, 'sourceLinesOfCode')

    stylesheetData.maxLinesOfCode = calc.getMax(stylesheetData.list, 'linesOfCode')
    stylesheetData.minLinesOfCode = calc.getMin(stylesheetData.list, 'linesOfCode')
    stylesheetData.avgLinesOfCode = calc.getAverage(stylesheetData.list, 'linesOfCode')

    stylesheetData.maxSize = calc.getMax(stylesheetData.list, 'size')
    stylesheetData.minSize = calc.getMin(stylesheetData.list, 'size')
    stylesheetData.avgSize = calc.getAverage(stylesheetData.list, 'size')

    stylesheetData.maxCommentsCount = calc.getMax(stylesheetData.list, 'comments', 'total')
    stylesheetData.minCommentsCount = calc.getMin(stylesheetData.list, 'comments', 'total', true)
    stylesheetData.minsCommentsCount = calc.getMins(stylesheetData.list, 'comments', 'total')
    stylesheetData.avgCommentsCount = calc.getAverage(stylesheetData.list, 'comments', 'total')

    stylesheetData.maxCommentsSize = calc.getMax(stylesheetData.list, 'comments', 'size')
    stylesheetData.minCommentsSize = calc.getMin(stylesheetData.list, 'comments', 'size', true)
    stylesheetData.minsCommentsSize = calc.getMins(stylesheetData.list, 'comments', 'size')
    stylesheetData.avgCommentsSize = calc.getAverage(stylesheetData.list, 'comments', 'size')

    helpers.saveFile(stylesheetFile, stylesheetData, true)

    if(!silent) {
      console.log(`✅ Analyzer stylesheet data saved at ${stylesheetFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Analyzer stylesheet data exists at ${stylesheetFile}`)
    }
  }

  return true
}

const selectorsReports = async (sites, name, silent) => {
  const root = helpers.getRootDirectoryBase();
  const selectorsFile = `${root}/site/_data/${name}-analyzer-selectors.json`

  if(!helpers.fileExists(selectorsFile) && sites.list) {
    const selectorsData = {
      list: []
    }

    for(const site of sites.list) {
      if(!site.css) {
        selectorsData.list.push({...await getSelectorsReport(site, silent)})
      }
    }

    if(!selectorsData.list.length) {
      return false
    }

    selectorsData.maxTotalSelectors = calc.getMax(selectorsData.list, 'total')
    selectorsData.minTotalSelectors = calc.getMin(selectorsData.list, 'total')
    selectorsData.avgTotalSelectors = calc.getAverage(selectorsData.list, 'total')

    selectorsData.maxIdSelectors = calc.getMax(selectorsData.list, 'id', 'total')
    selectorsData.minIdSelectors = calc.getMin(selectorsData.list, 'id', 'total')
    selectorsData.avgIdSelectors = calc.getAverage(selectorsData.list, 'id', 'total')

    selectorsData.maxA11ySelectors = calc.getMax(selectorsData.list, 'accessibility', 'total')
    selectorsData.minA11ySelectors = calc.getMin(selectorsData.list, 'accessibility', 'total')
    selectorsData.avgA11ySelectors = calc.getAverage(selectorsData.list, 'accessibility', 'total')

    selectorsData.maxKeyframesSelectors = calc.getMax(selectorsData.list, 'keyframes', 'total')
    selectorsData.minKeyframesSelectors = calc.getMin(selectorsData.list, 'keyframes', 'total')
    selectorsData.avgKeyframesSelectors = calc.getAverage(selectorsData.list, 'keyframes', 'total')

    selectorsData.maxComplexity = calc.getMax(selectorsData.list, 'complexity', 'max')
    selectorsData.minComplexity = calc.getMin(selectorsData.list, 'complexity', 'min')
    selectorsData.avgComplexity = calc.getAverage(selectorsData.list, 'complexity', 'mean')

    const maxSpecificities = selectorsData.list.sort((a, b) => compareSpecificity(a.specificity.max, b.specificity.max))
    selectorsData.maxSpecificity = maxSpecificities.shift()
    selectorsData.minMaxSpecificity = maxSpecificities.pop()
    selectorsData.maxSpecificityList = selectorsData.list.filter(a =>
      compareSpecificity(a.specificity.max, selectorsData.maxSpecificity.specificity.max) === 0)
    console.log('maxSpecificity', selectorsData.maxSpecificity.specificity);
    console.log('minMaxSpecificity', selectorsData.minMaxSpecificity.specificity);
    console.log('maxSpecificityList', selectorsData.maxSpecificityList.length);

    const minSpecificities = selectorsData.list.sort((a, b) => compareSpecificity(a.specificity.min, b.specificity.min))
    selectorsData.minSpecificity = minSpecificities.pop()
    selectorsData.maxMinSpecificity = minSpecificities.shift()
    selectorsData.minsSpecificity = selectorsData.list.filter(a =>
      compareSpecificity(a.specificity.min, selectorsData.minSpecificity.specificity.min) === 0)
    console.log('minSpecificity', selectorsData.minSpecificity.specificity);
    console.log('maxMinSpecificity', selectorsData.maxMinSpecificity.specificity);
    console.log('minsSpecificity', selectorsData.minsSpecificity.length);

    if(!silent) {
      console.log(`✅ Analyzer selectors data saved at ${selectorsFile}`)
    }
  } else {
    if(!silent) {
      console.log(`✅ Analyzer selectors data exists at ${selectorsFile}`)
    }
  }

  return true
}

const report = async (sites, name, silent) => {
  await stylesheetReports(sites, name, silent)
  await selectorsReports(sites, name, silent)
}

module.exports = {
  report
}

const files = require('./files.js')
const extractCss = require('extract-css-core')
const specificityGraph = require('specificity-graph')
const analyzer = require('@projectwallace/css-analyzer')
const Wappalyzer = require('wappalyzer')
const puppeteer = require('puppeteer')

const sites = require('./sites.json')

const namify = (name) => name.split(' ').join('-').toLowerCase()

const getFolder = (site) => {
  const folder = namify(`./reports/${site.category}/${site.year}/${site.month}/${site.title}`)

  if(!files.directoryExists(folder)) {
    files.makeDirectory(folder)
  }

  return folder
}

const generateReport = async (site, cssFile, specificityFile, analyzerFile, wappalyzerFile) => {
  console.log('\n')
  console.log('-----------------------------------------')
  console.log(`Report for the ${site.title} site.`);
  // const css = await files.getFile(cssFile)
  // console.log('-----------------------------------------')
  // console.log(css)
  const specificity = await files.getFile(specificityFile)
  const specificityData = JSON.parse(specificity)
  // console.log('-----------------------------------------')
  // console.log(Math.max.apply(Math, specificityData.map(spec => spec.specificity)))

  const analyzer = await files.getFile(analyzerFile)
  const analyzerData = JSON.parse(analyzer)
  console.log('-----------------------------------------')
  console.log('Total selectors: ', analyzerData['selectors.total'])
  console.log('Total unique selectors: ', analyzerData['selectors.totalUnique'])
  console.log('Percent of unique selectors: ', `${parseFloat(analyzerData['selectors.totalUnique'] / analyzerData['selectors.total'] * 100).toFixed(2)}`)

  console.log('')
  console.log('Total Universal selectors: ', analyzerData['selectors.universal.total'])
  console.log('Total unique Universal selectors: ', analyzerData['selectors.universal.totalUnique'])
  console.log('Percent of unique Universal selectors: ', analyzerData['selectors.universal.total'] > 0 ? `${parseFloat(analyzerData['selectors.universal.totalUnique'] / analyzerData['selectors.universal.total'] * 100).toFixed(2)}` : 0)

  console.log('')
  console.log('Total ID selectors: ', analyzerData['selectors.id.total'])
  console.log('Total unique ID selectors: ', analyzerData['selectors.id.totalUnique'])
  console.log('Percent of unique ID selectors: ', analyzerData['selectors.id.total'] > 0 ? `${parseFloat(analyzerData['selectors.id.totalUnique'] / analyzerData['selectors.id.total'] * 100).toFixed(2)}` : 0)

  console.log('')
  console.log('Total JavaScript selectors: ', analyzerData['selectors.js.total'])
  console.log('Total unique JavaScript selectors: ', analyzerData['selectors.js.totalUnique'])
  console.log('Percent of unique JavaScript selectors: ', analyzerData['selectors.js.total'] > 0 ? `${parseFloat(analyzerData['selectors.js.totalUnique'] / analyzerData['selectors.js.total'] * 100).toFixed(2)}` : 0)

  console.log('')
  console.log('Total Accessibility selectors: ', analyzerData['selectors.accessibility.total'])
  console.log('Total unique Accessibility selectors: ', analyzerData['selectors.accessibility.totalUnique'])
  console.log('Percent of unique Accessibility selectors: ', analyzerData['selectors.accessibility.total'] > 0 ? `${parseFloat(analyzerData['selectors.accessibility.totalUnique'] / analyzerData['selectors.accessibility.total'] * 100).toFixed(2)}` : 0)

  console.log('')
  console.log('Total Browser hacks selectors: ', analyzerData['selectors.browserhacks.total'])
  console.log('Total unique Browser hacks selectors: ', analyzerData['selectors.browserhacks.totalUnique'])
  console.log('Percent of unique Browser hacks selectors: ', analyzerData['selectors.browserhacks.total'] > 0 ? `${parseFloat(analyzerData['selectors.browserhacks.totalUnique'] / analyzerData['selectors.browserhacks.total'] * 100).toFixed(2)}` : 0)

  const regularSelectors = analyzerData['selectors.total'] - (analyzerData['selectors.universal.total'] + analyzerData['selectors.id.total'] + analyzerData['selectors.js.total'] + analyzerData['selectors.accessibility.total'] + analyzerData['selectors.browserhacks.total'])

  console.log('')
  console.log('Total Regular selectors: ', regularSelectors)
  console.log('Percent of Regular selectors: ', `${parseFloat(regularSelectors / analyzerData['selectors.total'] * 100).toFixed(2)}`)

  // const totalSpecificity = specificityData.reduce((a, b) => a + b.specificity || 0, 0)
  // console.log(specificityData[0], totalSpecificity, specificityData.length, analyzerData['selectors.total']);
  // console.log(totalSpecificity/specificityData.length);

  console.log('')
  console.log('Max specificity: ', `${analyzerData['selectors.specificity.max.value.a']}${analyzerData['selectors.specificity.max.value.b']}${analyzerData['selectors.specificity.max.value.c']}${analyzerData['selectors.specificity.max.value.d']}`)
  // console.log('Average specificity: ', `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

  console.log('')
  console.log('Average identifiers per rule: ', analyzerData['selectors.identifiers.average'])
  // console.log('Max identifiers value: ', analyzerData['selectors.identifiers.max.value'])
  // console.log('Max identifiers count: ', analyzerData['selectors.identifiers.max.count'])

  // console.log('')
  console.log('Average complexity per selector: ', analyzerData['selectors.complexity.average'])
  // console.log('Max complexity value: ', analyzerData['selectors.complexity.max.value'])
  // console.log('Max complexity count: ', analyzerData['selectors.complexity.max.count'])
  // console.log('Max complexity selectors: ', analyzerData['selectors.complexity.max.selectors'])
  console.log('Max complexity: ', analyzerData['selectors.complexity.sum'])
  // console.log('? Max complexity unique: ', analyzerData['selectors.complexity.unique'])
  console.log('? Max complexity total unique: ', analyzerData['selectors.complexity.totalUnique'])
  // console.log('Average specificity: ', `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

  console.log('')

  for (const key in analyzerData) {
    if (analyzerData.hasOwnProperty(key)) {
      if(key.indexOf('stylesheets.') === 0) {
        console.log(key);
      }
    }
  }

  const wappalyzer = await files.getFile(wappalyzerFile)
  const wappalyzerData = JSON.parse(wappalyzer)
  const frameworks = wappalyzerData.technologies.filter(tech => tech.categories.find(category => category.slug === 'ui-frameworks'))

  console.log('-----------------------------------------')
  console.log('UI frameworks:')
  frameworks.length > 0 ? frameworks.map(framework => console.log(framework.name)) : console.log('None');
}

const extract = async (site) => {
  const folder = getFolder(site)

  const cssFile = `${folder}/style.css`
  let cssString = ''

  if(!files.fileExists(cssFile)) {
    const cssItems = extractCss(site.url, {
      origins: 'include'
    })

    cssItems.forEach(cssItem => {
      if (cssItem.type === 'link-or-import') {
        cssString += cssItem.css
      }
    })

    files.saveFile(cssFile, cssString)

    console.log(`CSS file created in ${folder}`)
  } else {
    cssString = await files.getFile(cssFile)

    console.log(`CSS file: ${cssFile}`)
  }

  const specificityFolder = `${folder}/specificity/`

  if(!files.directoryExists(specificityFolder)) {
    files.makeDirectory(specificityFolder)
  }

  const specificityFile = `${specificityFolder}/specificity.json`

  if(!files.fileExists(specificityFile)) {
    specificityGraph(specificityFolder, cssString, function(directory) {
      directory.forEach(dir => {
        if(dir) {
          console.log(`Specificity graph files created in ${dir}.`)
        }
      })
    })
  } else {
    console.log(`Specificity graph file: ${specificityFile}`)
  }

  const analyzerFile = `${folder}/analyzer.json`

  if(!files.fileExists(analyzerFile)) {
    analyzer(cssString)
      .then(result => {
        files.saveFile(`${folder}/analyzer.json`, result, true)

        console.log(`Analyzer file created in ${folder}`)

        return true
      })
      .catch(error => console.error(error))
  } else {
    console.log(`Analyzer file: ${specificityFile}`)
  }

  const wappalyzerFile = `${folder}/wappalyzer.json`

  if(!files.fileExists(wappalyzerFile)) {
    const wappalyzerConfig = {
      debug: false,
      delay: 500,
      headers: {},
      maxDepth: 3,
      maxUrls: 10,
      maxWait: 5000,
      recursive: true,
      probe: true,
      userAgent: 'Wappalyzer',
      htmlMaxCols: 2000,
      htmlMaxRows: 2000,
    }

    const wappalyzer = new Wappalyzer()

    try {
      await wappalyzer.init()

      // Optionally set additional request headers
      const headers = {}

      const website = wappalyzer.open(site.url, headers)

      // Optionally capture and output errors
      website.on('error', console.error)

      const results = await website.analyze()

      files.saveFile(wappalyzerFile, results, true)

      console.log(`Wappalyzer file created in ${folder}`)
    } catch (error) {
      console.error(error)
    }

    await wappalyzer.destroy()
  } else {
    console.log(`Wappalyzer file: ${wappalyzerFile}`)
  }

  // (async () => {
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   await page.goto('https://example.com')
  //   await page.screenshot({path: 'example.png'})

  //   await browser.close()
  // })()

  await generateReport(site, cssFile, specificityFile, analyzerFile, wappalyzerFile)

  return true
}

const analyze = async (site) => {
  await extract(site)
}

const start = async (websites) => {
  await Promise.all(websites.map(async (site) => {
    await analyze(site)
  }))
}

start(sites)

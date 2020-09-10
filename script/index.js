const files = require('./files.js')
const extractCss = require('extract-css-core')
const CleanCSS = require('clean-css')
const specificityGraph = require('specificity-graph')
const analyzer = require('@projectwallace/css-analyzer')
const Wappalyzer = require('wappalyzer')
const puppeteer = require('puppeteer')
const stripComments = require('strip-css-comments')
const beautify = require('beautify')
const validator = require('css-validator')

const sites = require('./sites.json')

const namify = (name) => name.split(' ').join('-').replace('&', 'and').toLowerCase()

const getFolder = (site) => {
  const folder = namify(`./reports/${site.category}/${site.year}/${site.month}/${site.title}`)

  if(!files.directoryExists(folder)) {
    files.makeDirectory(folder)
  }

  return folder
}

const generateSpecificity = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)
    const specificityFolder = `${folder}/specificity`
    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      return false
    }

    const specificityRaw = await files.getFile(specificityFile)
    const specificityData = JSON.parse(specificityRaw)

    console.log('')
    console.log(`[${site.title}] Specificity: `, Math.max.apply(Math, specificityData.map(spec => spec.specificity)))

    resolve()
  })
}

const generateAnalyzer = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)
    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      return false
    }

    const analyzerRaw = await files.getFile(analyzerFile)
    const analyzerData = JSON.parse(analyzerRaw)

    console.log('')

    console.log(`[${site.title}] Total selectors: `, analyzerData['selectors.total'])
    console.log(`[${site.title}] Total unique selectors: `, analyzerData['selectors.totalUnique'])
    console.log(`[${site.title}] Percent of unique selectors: `, `${parseFloat(analyzerData['selectors.totalUnique'] / analyzerData['selectors.total'] * 100).toFixed(2)}`)

    console.log('')
    console.log(`[${site.title}] Total Universal selectors: `, analyzerData['selectors.universal.total'])
    console.log(`[${site.title}] Total unique Universal selectors: `, analyzerData['selectors.universal.totalUnique'])
    console.log(`[${site.title}] Percent of unique Universal selectors: `, analyzerData['selectors.universal.total'] > 0 ? `${parseFloat(analyzerData['selectors.universal.totalUnique'] / analyzerData['selectors.universal.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`[${site.title}] Total ID selectors: `, analyzerData['selectors.id.total'])
    console.log(`[${site.title}] Total unique ID selectors: `, analyzerData['selectors.id.totalUnique'])
    console.log(`[${site.title}] Percent of unique ID selectors: `, analyzerData['selectors.id.total'] > 0 ? `${parseFloat(analyzerData['selectors.id.totalUnique'] / analyzerData['selectors.id.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`[${site.title}] Total JavaScript selectors: `, analyzerData['selectors.js.total'])
    console.log(`[${site.title}] Total unique JavaScript selectors: `, analyzerData['selectors.js.totalUnique'])
    console.log(`[${site.title}] Percent of unique JavaScript selectors: `, analyzerData['selectors.js.total'] > 0 ? `${parseFloat(analyzerData['selectors.js.totalUnique'] / analyzerData['selectors.js.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`[${site.title}] Total Accessibility selectors: `, analyzerData['selectors.accessibility.total'])
    console.log(`[${site.title}] Total unique Accessibility selectors: `, analyzerData['selectors.accessibility.totalUnique'])
    console.log(`[${site.title}] Percent of unique Accessibility selectors: `, analyzerData['selectors.accessibility.total'] > 0 ? `${parseFloat(analyzerData['selectors.accessibility.totalUnique'] / analyzerData['selectors.accessibility.total'] * 100).toFixed(2)}` : 0)

    console.log('')
    console.log(`[${site.title}] Total Browser hacks selectors: `, analyzerData['selectors.browserhacks.total'])
    console.log(`[${site.title}] Total unique Browser hacks selectors: `, analyzerData['selectors.browserhacks.totalUnique'])
    console.log(`[${site.title}] Percent of unique Browser hacks selectors: `, analyzerData['selectors.browserhacks.total'] > 0 ? `${parseFloat(analyzerData['selectors.browserhacks.totalUnique'] / analyzerData['selectors.browserhacks.total'] * 100).toFixed(2)}` : 0)

    const regularSelectors = analyzerData['selectors.total'] - (analyzerData['selectors.universal.total'] + analyzerData['selectors.id.total'] + analyzerData['selectors.js.total'] + analyzerData['selectors.accessibility.total'] + analyzerData['selectors.browserhacks.total'])

    console.log('')
    console.log(`[${site.title}] Total Regular selectors: `, regularSelectors)
    console.log(`[${site.title}] Percent of Regular selectors: `, `${parseFloat(regularSelectors / analyzerData['selectors.total'] * 100).toFixed(2)}`)

    // const totalSpecificity = specificityData.reduce((a, b) => a + b.specificity || 0, 0)
    // console.log(specificityData[0], totalSpecificity, specificityData.length, analyzerData['selectors.total'])
    // console.log(totalSpecificity/specificityData.length)

    console.log('')
    console.log(`[${site.title}] Max specificity: `, `${analyzerData['selectors.specificity.max.value.a']}${analyzerData['selectors.specificity.max.value.b']}${analyzerData['selectors.specificity.max.value.c']}${analyzerData['selectors.specificity.max.value.d']}`)
    // console.log(`[${site.title}] Average specificity: `, `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)

    console.log('')
    console.log(`[${site.title}] Average identifiers per rule: `, analyzerData['selectors.identifiers.average'])
    // console.log(`[${site.title}] Max identifiers value: `, analyzerData['selectors.identifiers.max.value'])
    // console.log(`[${site.title}] Max identifiers count: `, analyzerData['selectors.identifiers.max.count'])

    // console.log('')
    console.log(`[${site.title}] Average complexity per selector: `, analyzerData['selectors.complexity.average'])
    // console.log(`[${site.title}] Max complexity value: `, analyzerData['selectors.complexity.max.value'])
    // console.log(`[${site.title}] Max complexity count: `, analyzerData['selectors.complexity.max.count'])
    // console.log(`[${site.title}] Max complexity selectors: `, analyzerData['selectors.complexity.max.selectors'])
    console.log(`[${site.title}] Max complexity: `, analyzerData['selectors.complexity.sum'])
    // console.log(`[${site.title}] ? Max complexity unique: `, analyzerData['selectors.complexity.unique'])
    console.log(`[${site.title}] ? Max complexity total unique: `, analyzerData['selectors.complexity.totalUnique'])
    // console.log(`[${site.title}] Average specificity: `, `${specificityData.specificity.max.value.a}${selectors.specificity.max.value.b}${selectors.specificity.max.value.c}${selectors.specificity.max.value.d}`)


    for (const key in analyzerData) {
      if (analyzerData.hasOwnProperty(key)) {
        if(key.indexOf('stylesheets.') === 0) {
          // console.log(key)
        }
      }
    }

    resolve()
  })
}

const generateWappalyzer = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)
    const wappalyzerFile = `${folder}/wappalyzer.json`

    if(!files.fileExists(wappalyzerFile)) {
      return false
    }

    const wappalyzerRaw = await files.getFile(wappalyzerFile)
    const wappalyzerData = JSON.parse(wappalyzerRaw)

    const frameworks = wappalyzerData.technologies.filter(tech => tech.categories.find(category => category.slug === 'ui-frameworks'))

    const frameworksUsed = frameworks.length > 0 ? frameworks.map(framework => framework.name).join(', ') : 'None'

    console.log('')
    console.log(`[${site.title}] UI frameworks:`, frameworksUsed)

    resolve()
  })
}

const generateValidator = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)

    const errorsFile = `${folder}/errors.json`

    if(!files.fileExists(errorsFile)) {
      return false
    }

    const errorsRaw = await files.getFile(errorsFile)
    const errorsData = JSON.parse(errorsRaw)

    console.log('')

    const errorsKeys = Object.keys(errorsData)

    if(errorsKeys.length) {
      errorsKeys.map(errorsKey => {
        const errorsValue = Object.values(errorsData[errorsKey])
        console.log(`[${site.title}] Number of ${errorsKey} errors: `, errorsValue.length)
      })
    }

    const warningsFile = `${folder}/warnings.json`

    if(!files.fileExists(warningsFile)) {
      return false
    }

    const warningsRaw = await files.getFile(warningsFile)
    const warningsData = JSON.parse(warningsRaw)

    console.log('')

    const warningsKeys = Object.keys(warningsData)

    if(warningsKeys.length) {
      warningsKeys.map(warningsKey => {
        const warningsValue = Object.values(warningsData[warningsKey])
        console.log(`[${site.title}] Number of ${warningsKey} warnings: `, warningsValue.length)
      })
    }

    resolve()
  })
}

const generateReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    // const folder = getFolder(site)

    // const cssFileClean = `${folder}/style-clean.css`

    // if(!files.fileExists(cssFileClean)) {
    //   return false
    // }

    // const cssString = await files.getFile(cssFileClean)

    // await generateSpecificity(site)
    // await generateAnalyzer(site)
    // await generateWappalyzer(site)
    await generateValidator(site)

    resolve()
  })
}

const extract = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)

    const cssFileDirty = `${folder}/style-dirty.css`
    const cssFileClean = `${folder}/style-clean.css`
    let cssString = ''

    if(!files.fileExists(cssFileClean)) {
      const cssItems = await extractCss(site.url, {
        origins: 'include'
      })

      cssItems.forEach(cssItem => {
        if (cssItem.type === 'link-or-import') {
          cssString += cssItem.css
        }
      })

      files.saveFile(cssFileDirty, cssString)

      const cssClean = new CleanCSS({
        format: 'beautify'
      }).minify(cssString)



      // console.log(cssString.styles)
      // console.log(cssString.stats)
      // console.log(cssString.warnings)
      // console.log(cssString.errors)

      files.saveFile(cssFileClean, cssClean.styles)

      // cssString = beautify(cssString, {
      //   format: 'css'
      // })

      // cssString = stripComments(cssString, {
      //   preserve: false
      // })

      console.log(`CSS file created in ${folder}`)
    } else {
      cssString = await files.getFile(cssFileClean)

      console.log(`CSS file: ${cssFileClean}`)
    }

    resolve()
  })
}

const validate = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)

    const errorsFile = `${folder}/errors.json`
    const warningsFile = `${folder}/warnings.json`

    if(!files.fileExists(errorsFile) || !files.fileExists(warningsFile)) {
      const cssFile = `${folder}/style-clean.css`
      // const cssFile = `${folder}/style-dirty.css`

      if(!files.fileExists(cssFile)) {
        return false
      }

      const cssString = await files.getFile(cssFile)

      validator(cssString, (err, data) => {
        let errorData = {}

        data.errors.forEach(error => {
          const t = error.type || error.errortype

          if(t === 'noexistence-typo') {
            // console.log(error)
          }

          if(!(t in errorData)) {
            errorData[t] = []
          }


          errorData[t].push(error)
        })

        let warningData = {}

        data.warnings.forEach(warning => {
          const t = warning.type || warning.warningtype

          if(!(t in warningData)) {
            warningData[t] = []
          }

          warningData[t].push(warning)
        })

        files.saveFile(errorsFile, errorData)
        files.saveFile(warningsFile, warningData)

        console.log(`Errors and warnings files created in ${folder}.`)
      })
    } else {
      console.log(`Errors file: ${errorsFile}`)
      console.log(`Warnings file: ${warningsFile}`)
    }


    resolve()
  })
}

const specs = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(!files.fileExists(cssFileClean)) {
      return false
    }

    const cssString = await files.getFile(cssFileClean)

    const specificityFolder = `${folder}/specificity`

    if(!files.directoryExists(specificityFolder)) {
      files.makeDirectory(specificityFolder)
    }

    const specificityFile = `${specificityFolder}/specificity.json`

    if(!files.fileExists(specificityFile)) {
      specificityGraph(specificityFolder, cssString, (directory) => {
        directory.forEach(dir => {
          if(dir) {
            console.log(`Specificity graph files created in ${dir}.`)
          }
        })
      })
    } else {
      console.log(`Specificity graph file: ${specificityFile}`)
    }

    resolve()
  })
}

const wapp = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)
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

    resolve()
  })
}

const analyze = async (site) => {
  return new Promise(async (resolve, reject) => {
    const folder = getFolder(site)

    const cssFileClean = `${folder}/style-clean.css`

    if(!files.fileExists(cssFileClean)) {
      return false
    }

    const cssString = await files.getFile(cssFileClean)

    const analyzerFile = `${folder}/analyzer.json`

    if(!files.fileExists(analyzerFile)) {
      analyzer(`${cssString}`)
        .then(result => {
          files.saveFile(analyzerFile, result, true)

          console.log(`Analyzer file created in ${folder}`)
        })
        .catch(error => console.error(error))
    } else {
      console.log(`-----Analyzer file: ${analyzerFile}`)
    }

    resolve()
  })
}

const start = async () => {
  Promise.all(sites.map(async (site) => {
    await extract(site)
    await validate(site)
    await specs(site)
    await wapp(site)
    await analyze(site)
    await generateReport(site)
  }))
}

const runExtract = async () => {
  Promise.all(sites.map(async (site) => {
    await extract(site)
  }))
}

const runValidate = async () => {
  Promise.all(sites.map(async (site) => {
    await validate(site)
  }))
}

const runSpecs = async () => {
  Promise.all(sites.map(async (site) => {
    await specs(site)
  }))
}

const runWapp = async () => {
  Promise.all(sites.map(async (site) => {
    await wapp(site)
  }))
}

const runAnalyses = async () => {
  Promise.all(sites.map(async (site) => {
    await analyze(site)
  }))
}

const showAnalyses = async () => {
  Promise.all(sites.map(async (site) => {
    await generateReport(site)
  }))
}

module.exports = {
  start,
  runExtract,
  runValidate,
  runSpecs,
  runWapp,
  runAnalyses,
  showAnalyses,
}

require('make-runnable')

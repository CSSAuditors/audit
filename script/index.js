const files = require('./files')
const extractorScript = require('./run-extractor')
const validatorScript = require('./run-validator')
const coverageScript = require('./run-coverage')
const screenshotScript = require('./run-screenshot')
const specificityScript = require('./run-specificity')
const wappalyzerScript = require('./run-wappalyzer')
const analyzerScript = require('./run-analyzer')

const validatorReport = require('./get-validator')
const coverageReport = require('./get-coverage')
const wappalyzerReport = require('./get-wappalyzer')
const specificityReport = require('./get-specificity')
const { analyzerReport } = require('./get-analyzer')

const sites = require('./sites.json')

const ret = process.argv.indexOf('ret') !== -1

const runExtractor = async () => {
  for(const site of sites) {
    await extractorScript(site)
  }
}

const runValidator = async () => {
  for(const site of sites) {
    await validatorScript(site)
  }
}

const runCoverage = async () => {
  for(const site of sites) {
    await coverageScript(site)
  }
}

const runScreenshot = async () => {
  for(const site of sites) {
    await screenshotScript(site)
  }
}

const runSpecificity = async () => {
  for(const site of sites) {
    await specificityScript(site)
  }
}

const runWappalyzer = async () => {
  for(const site of sites) {
    await wappalyzerScript(site)
  }
}

const runAnalyses = async () => {
  for(const site of sites) {
    await analyzerScript(site)
  }
}

const start = async () => {
  Promise.all(sites.map(async (site) => {
    await runExtractor(site)
    await runValidator(site)
    await runCoverage(site)
    await runScreenshot(site)
    await runSpecificity(site)
    await runWappalyzer(site)
    await runAnalyses(site)
  }))
}

const getValidator = async () => {
  for(const site of sites) {
    await validatorReport(site)
  }
}

const getCoverages = async (ret) => {
  const coverages = []

  for(const site of sites) {
    coverageAmount = await coverageReport(site, ret)

    coverages.push({...site, ...{
      coverage: coverageAmount
    }})
  }

  if(ret) {
    return coverages
  }
}

const averageCoverage = async () => {
  const coverages = await getCoverages(true)
  console.log(coverages);
}

const getWappalyzer = async () => {
  for(const site of sites) {
    await wappalyzerReport(site)
  }
}

const getSpecificity = async () => {
  for(const site of sites) {
    await specificityReport(site)
  }
}

const getAnalyzer = async () => {
  for(const site of sites) {
    await analyzerReport(site)
  }
}

const generateReport = async (site) => {
  return new Promise(async (resolve, reject) => {
    await validatorReport(site)
    await coverageReport(site)
    await wappalyzerReport(site)
    await specificityReport(site)
    await analyzerReport(site)

    resolve()
  })
}

const showAnalyses = async () => {
  for(const site of sites) {
    await generateReport(site)
  }
}

module.exports = {
  start,
  runExtractor,
  runValidator,
  runCoverage,
  runScreenshot,
  runSpecificity,
  runWappalyzer,
  runAnalyses,
  getValidator,
  getCoverages,
  getWappalyzer,
  getSpecificity,
  getAnalyzer,
  averageCoverage,
  showAnalyses,
}

require('make-runnable')

const files = require('./files')
const extractorScript = require('./run-extractor')
const validatorScript = require('./run-validator')
const coverageScript = require('./run-coverage')
const screenshotScript = require('./run-screenshot')
const specificityScript = require('./run-specificity')
const wappalyzerScript = require('./run-wappalyzer')
const analyzerScript = require('./run-analyzer')

const { getExtractorReport, getExtractorsReport } = require('./get-extractor')
const { validatorReport, validatorsReport } = require('./get-validator')
const { coverageReport, coveragesReport } = require('./get-coverage')
const { wappalyzerReport, wappalyzersReport, generateWappalyzersReport } = require('./get-wappalyzer')
const { specificityReport, specificitiesReport } = require('./get-specificity')
const { analyzerReport } = require('./get-analyzer')

let sites = require('../site/_data/sites2.json')

const ret = process.argv.indexOf('ret') !== -1

const site = process.argv.find(arg => arg.indexOf('site=') !== -1)

if(site) {
  const singleSite = sites.filter(s => site.indexOf(s.title) !== -1)

  if(singleSite) {
    sites = singleSite
  }
}


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
  await runExtractor()
  await runValidator()
  await runCoverage()
  await runScreenshot()
  await runSpecificity()
  await runWappalyzer()
  await runAnalyses()
}

const getExtractor = async () => {
  for(const site of sites) {
    await getExtractorReport(site)
  }
}

const getExtractors = async () => {
  await getExtractorsReport(sites)
}

const getValidator = async () => {
  for(const site of sites) {
    await validatorReport(site)
  }
}

const getValidators = async () => {
  await validatorsReport(sites)
}

const getCoverage = async () => {
  for(const site of sites) {
    coverageAmount = await coverageReport(site)
  }
}

const getCoverages = async () => {
  await coveragesReport(sites)
}

const getWappalyzer = async () => {
  for(const site of sites) {
    await wappalyzerReport(site)
  }
}

const getWappalyzers = async () => {
  generateWappalyzersReport(sites)
  // await wappalyzersReport(sites)
}

const getSpecificity = async () => {
  for(const site of sites) {
    await specificityReport(site)
  }
}

const getSpecificities = async () => {
  await specificitiesReport(sites)
}

const getAnalyzer = async () => {
  for(const site of sites) {
    await analyzerReport(site)
  }
}

const generateAnalyses = async () => {
  await getExtractor()
  await getValidator()
  await getCoverage()
  await getWappalyzer()
  await getSpecificity()
  await getAnalyzer()
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
  getExtractor,
  getExtractors,
  getValidator,
  getValidators,
  getCoverage,
  getCoverages,
  getWappalyzer,
  getWappalyzers,
  getSpecificity,
  getSpecificities,
  getAnalyzer,
  generateAnalyses,
}

require('make-runnable')

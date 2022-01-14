const helpers = require('./helpers')
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

const runExtractor = async (reports) => {
  for(const report of reports) {
    await extractorScript(report)
  }
}

const runValidator = async (reports) => {
  for(const report of reports) {
    await validatorScript(report)
  }
}

const runCoverage = async (reports) => {
  for(const report of reports) {
    await coverageScript(report)
  }
}

const runScreenshot = async (reports) => {
  for(const report of reports) {
    await screenshotScript(report)
  }
}

const runSpecificity = async (reports) => {
  for(const report of reports) {
    await specificityScript(report)
  }
}

const runWappalyzer = async (reports) => {
  for(const report of reports) {
    await wappalyzerScript(report)
  }
}

const runAnalyses = async (reports) => {
  for(const report of reports) {
    await analyzerScript(report)
  }
}

const prepareData = async (reports) => {
  const reportsData = helpers.prepareData(reports)
  await runExtractor(reportsData)
  await runValidator(reportsData)
  await runCoverage(reportsData)
  await runScreenshot(reportsData)
  await runSpecificity(reportsData)
  await runWappalyzer(reportsData)
  // await runAnalyses()
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
  prepareData,
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

const calc = require('./calc')
const helpers = require('./helpers')
const extractorScript = require('./run-extractor')
const validatorScript = require('./run-validator')
const coverageScript = require('./run-coverage')
// const screenshotScript = require('./run-screenshot')
const specificityScript = require('./run-specificity')
const wappalyzerScript = require('./run-wappalyzer')
const analyzerScript = require('./run-analyzer')

const extractorReport = require('./get-extractor')
const wappalyzerReport = require('./get-wappalyzer')
const validatorReport = require('./get-validator')
const { coverageReport, coveragesReport } = require('./get-coverage')
const { specificityReport, specificitiesReport } = require('./get-specificity')
const { analyzerReport } = require('./get-analyzer')
const { loadImage } = require('canvas')

const runExtractor = async (reports, silent) => {
  for(const report of reports) {
    await extractorScript(report, silent)
  }
}

const runValidator = async (reports, silent) => {
  for(const report of reports) {
    await validatorScript(report, silent)
  }
}

const runCoverage = async (reports, silent) => {
  for(const report of reports) {
    await coverageScript(report, silent)
  }
}

// const runScreenshot = async (reports, silent) => {
//   for(const report of reports) {
//     await screenshotScript(report, silent)
//   }
// }

const runSpecificity = async (reports, silent) => {
  for(const report of reports) {
    await specificityScript(report, silent)
  }
}

const runWappalyzer = async (reports, silent) => {
  for(const report of reports) {
    await wappalyzerScript(report, silent)
  }
}

// const runAnalyses = async (reports, silent) => {
//   for(const report of reports) {
//     await analyzerScript(report, silent)
//   }
// }

const prepareData = async (reports, silent) => {
  const reportsData = helpers.prepareAllData(reports)
  await runExtractor(reportsData, silent)
  await runValidator(reportsData, silent)
  await runCoverage(reportsData, silent)
  // await runScreenshot(reportsData, silent)
  await runSpecificity(reportsData, silent)
  await runWappalyzer(reportsData, silent)
  return true
}

const getExtractor = async (report, name, silent) => {
  await extractorReport.report(report, name, silent)
}

const getWappalyzer = async (report, name, silent) => {
  await wappalyzerReport.report(report, name, silent)
}

const getValidator = async (report, name, silent) => {
  await validatorReport.report(report, name, silent)
}

const getValidators = async (sites, name, silent) => {
  await validatorsReport(sites)
}

const getCoverage = async (sites, name, silent) => {
  for(const report of reports) {
    coverageAmount = await coverageReport(report)
  }
}

const getCoverages = async (sites, name, silent) => {
  await coveragesReport(sites)
}

const getWappalyzers = async (sites, name, silent) => {
  generateWappalyzersReport(sites)
  // await wappalyzersReport(sites)
}

const getSpecificity = async (sites, name, silent) => {
  for(const report of reports) {
    await specificityReport(report)
  }
}

const getSpecificities = async (sites, name, silent) => {
  await specificitiesReport(sites)
}

const getAnalyzer = async (sites, name, silent) => {
  for(const report of reports) {
    await analyzerReport(report)
  }
}

const processData = async (report, name, silent) => {
  await getExtractor(report, name, silent)
  await getWappalyzer(report, name, silent)
  await getValidator(report, name, silent)
  // await getCoverage()
  // await getSpecificity()
  // await getAnalyzer()
}

const getExtractorName = (str) => {
  return extractorReport.getName(str)
}

const getFileSize = (size) => {
  return calc.getFileSize(size)
}

module.exports = {
  prepareData,
  processData,
  getExtractorName,
  getFileSize
}

require('make-runnable')

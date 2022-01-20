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
const { validatorReport, validatorsReport } = require('./get-validator')
const { coverageReport, coveragesReport } = require('./get-coverage')
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

// const runScreenshot = async (reports) => {
//   for(const report of reports) {
//     await screenshotScript(report)
//   }
// }

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
  const reportsData = helpers.prepareAllData(reports)
  await runExtractor(reportsData)
  await runValidator(reportsData)
  await runCoverage(reportsData)
  // await runScreenshot(reportsData)
  await runSpecificity(reportsData)
  await runWappalyzer(reportsData)
  return true
}

const getExtractor = async (report, name) => {
  await extractorReport.report(report, name)
}

const getWappalyzer = async (report, name) => {
  await wappalyzerReport.report(report, name)
}

const getValidator = async (reports) => {
  for(const report of reports) {
    await validatorReport(report)
  }
}

const getValidators = async (reports) => {
  await validatorsReport(sites)
}

const getCoverage = async (reports) => {
  for(const report of reports) {
    coverageAmount = await coverageReport(report)
  }
}

const getCoverages = async (reports) => {
  await coveragesReport(sites)
}

const getWappalyzers = async (reports) => {
  generateWappalyzersReport(sites)
  // await wappalyzersReport(sites)
}

const getSpecificity = async (reports) => {
  for(const report of reports) {
    await specificityReport(report)
  }
}

const getSpecificities = async (reports) => {
  await specificitiesReport(sites)
}

const getAnalyzer = async (reports) => {
  for(const report of reports) {
    await analyzerReport(report)
  }
}

const processData = async (report, name) => {
  await getExtractor(report, name)
  await getWappalyzer(report, name)
  // await getValidator()
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

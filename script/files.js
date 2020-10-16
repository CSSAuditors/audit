const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const ncp = require('ncp')
const pdf = require('html-pdf')

ncp.limit = 16

const getCurrentDirectoryBase = () => {
  try {
    return path.basename(process.cwd())
  } catch (err) {
    console.error(err)

    return false
  }
}

const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    console.error(err)

    return false
  }
}

const directoryExists = (dirPath) => {
  try {
    if (!fileExists(dirPath)) {
      return false
    }

    return fs.statSync(dirPath).isDirectory()
  } catch (err) {
    console.error(err)

    return false
  }
}

const makeDirectory = (dirPath) => {
  try {
    if (!directoryExists(dirPath)) {
      return mkdirp(dirPath)
    }

    return true
  } catch (err) {
    console.error(err)

    return false
  }
}

const saveFile = (filePath, content, stringify) => {
  try {
    const data = stringify === true ? JSON.stringify(content, null, 2) : content

    fs.writeFileSync(filePath, data, 'utf-8')

    return true
  } catch (err) {
    console.error(err)

    return false
  }
}

const getFile = async (filePath) => {
  try {
    return fs.readFileSync(filePath, {
      encoding:'utf8'
    })
  } catch (err) {
    console.error(err)

    return false
  }
}

const namify = (name) => name.split(' ').join('-').replace('&', 'and').toLowerCase()

const getFolder = (site) => {
  const folder = namify(`./reports/${site.category}/${site.year}/${site.month}/${site.title}`)

  if(!directoryExists(folder)) {
    makeDirectory(folder)
  }

  return folder
}

const getReportsFolder = (site) => {
  const folder = namify(`./reports/${site.category}/${site.year}/${site.month}/_reports`)

  return folder
}

const generateHTML = (s, fileName) => {
  return saveFile(fileName, s)
}

const generatePDF = (s, fileName) => {
  pdf.create(s, {
    format: 'A4',
    orientation: 'portrait',
    "border": "1cm"
  }).toFile(fileName, function(err, res) {
    if (err) {
      return console.log(err)
    }

    console.log(res)
  })
}

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  makeDirectory,
  fileExists,
  saveFile,
  getFile,
  getFolder,
  getReportsFolder,
  generateHTML,
  generatePDF,
}

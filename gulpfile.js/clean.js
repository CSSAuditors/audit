// const gulp = require('gulp')
const del = require('del');
const fs = require('fs')

const { helpers } = require('./helpers');

// Will delete dist folder
function cleanStart() {
  return del(helpers.dist());
}

// Will delete provided folder
function cleanFolder(folder) {
  try {
    if (!fs.existsSync(folder)) {
      return false
    }

    return fs.statSync(folder).isDirectory()
  } catch (err) {
    console.error(err)

    return false
  }
}

exports.clean = {
  cleanStart,
  cleanFolder,
};

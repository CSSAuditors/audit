const gzipSize = require('gzip-size')

const getMax = (arr, prop1, prop2, prop3) => arr.reduce((a, b) => {

  let c
  let d

  if(prop1) {
    c = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
    d = b && b.hasOwnProperty(prop1) ? b[prop1] : 0
  }

  if(prop2) {
    c = c && c.hasOwnProperty(prop2) ? c[prop2] : 0
    d = d && d.hasOwnProperty(prop2) ? d[prop2] : 0
  }

  if(prop3) {
    c = c && c.hasOwnProperty(prop3) ? c[prop3] : 0
    d = d && d.hasOwnProperty(prop3) ? d[prop3] : 0
  }

  return c > d ? a : b
})

const getMin = (arr, prop1, prop2, prop3, zero) => arr.reduce((a, b) => {
  let c
  let d

  if(prop1) {
    c = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
    d = b && b.hasOwnProperty(prop1) ? b[prop1] : 0
  }

  if(prop2) {
    c = c && c.hasOwnProperty(prop2) ? c[prop2] : 0
    d = d && d.hasOwnProperty(prop2) ? d[prop2] : 0
  }

  if(prop3) {
    c = c && c.hasOwnProperty(prop3) ? c[prop3] : 0
    d = d && d.hasOwnProperty(prop3) ? d[prop3] : 0
  }

  return zero ? c === 0 ? b : d === 0 ? a : c < d ? a : b : c < d ? a : b
})

const getMins = (arr, prop1, prop2, prop3, zero) => arr.filter((a) => {
  let c

  if(prop1) {
    c = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
  }

  if(prop2) {
    c = c && c.hasOwnProperty(prop2) ? c[prop2] : 0
  }

  if(prop3) {
    c = c && c.hasOwnProperty(prop3) ? c[prop3] : 0
  }

  return c === 0
})

const getAverage = (arr, prop1, prop2, prop3) => {
  let average = 0

  arr.map((a) => {
    let b

    if(prop1) {
      b = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
    }

    if(prop2) {
      b = b && b.hasOwnProperty(prop2) ? b[prop2] : 0
    }

    if(prop3) {
      b = b && b.hasOwnProperty(prop3) ? b[prop3] : 0
    }

    average += b
  })

  return average / arr.length
}

const getOverall = (arr, prop1, prop2) => {
  let count = 0

  arr.map((a) => {
    let b

    if(prop1) {
      b = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
    }

    if(prop2) {
      b = b && b.hasOwnProperty(prop2) ? b[prop2] : 0
    }

    count += b
  })

  return count
}

const getRound = (a, b) => b !== 0 ? a.toFixed(b) : Math.floor(a)

const getPercent = (a, b) => getRound((a === 0 || b === 0) ? 0 : parseFloat(a / b * 100))

const getSize = (a, type) => {
  return a[type] ? a[type].size ? a[type].size : 0 : 0
}

const getCount = (a, type) => {
  return a[type] ? a[type].count ? a[type].count : 0 : 0
}

const getGzipSize = (a, prop1, prop2) => {
  let b = a

  if(prop1) {
    b = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
  }

  if(prop2) {
    b = b && b.hasOwnProperty(prop2) ? b[prop2] : 0
  }

  const c = b && b.length > 0 ? b.replace(/(\[x-extract-css-inline-style\])*/g, '') : ''

  return gzipSize.sync(c)
}

module.exports = {
  getMax,
  getMin,
  getMins,
  getAverage,
  getOverall,
  getRound,
  getPercent,
  getSize,
  getCount,
  getGzipSize,
}

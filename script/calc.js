const getMax = (arr, prop1, prop2) => arr.reduce((a, b) => {
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

  return c > d ? a : b
})

const getMin = (arr, prop1, prop2) => arr.reduce((a, b) => {
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

  return c < d ? a : b
})

const getAverage = (arr, prop1, prop2) => {
  let average = 0
  arr.map((a) => {
    let b

    if(prop1) {
      b = a && a.hasOwnProperty(prop1) ? a[prop1] : 0
    }

    if(prop2) {
      b = b && b.hasOwnProperty(prop2) ? b[prop2] : 0
    }

    average += b
  })

  return average / arr.length
}

const getRound = (a) => a.toFixed(2)

const getPercent = (a, b) => getRound((a === 0 || b === 0) ? 0 : parseFloat(a / b * 100))

module.exports = {
  getMax,
  getMin,
  getAverage,
  getRound,
  getPercent
}

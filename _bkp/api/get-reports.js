// const files = require('../script/files')

exports.handler = function (event, context, callback) {
  // const f = `./reports/${files.trimSlashes(event.queryStringParameters.d)}/`

  // if(files.directoryExists(f)) {
  //   // const r = files.getFile(f)
  // }

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok'
    })
  })
}

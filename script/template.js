const template = (string, data) => {
  let ret = string

  for (var p in data) {
    ret = ret.replace(p, data[p]);
  }

  return ret;
}

const wrapLines = (obj, spl, wrap, jn) => obj.split(spl).map(i => i.length > 0 ? `<${wrap}>${i}</${wrap}>` : i).join(jn)

module.exports = {
  template,
  wrapLines,
}

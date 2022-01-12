const removeEmojis = (string) => {
  const unified_emoji_ranges = ['\ud83c[\udf00-\udfff]','\ud83d[\udc00-\ude4f]','\ud83d[\ude80-\udeff]']
  const reg = new RegExp(unified_emoji_ranges.join('|'), 'g')

  return string.replace(reg, '')
}
const template = (string, data) => {
  let ret = string

  for (var p in data) {
    ret = ret.replace(p, data[p]);
  }

  return removeEmojis(ret);
}

const wrapLines = (obj, spl, wrap, jn) => obj.split(spl).map(i => i.trim().length > 0 ? `<${wrap}>${i.trim()}</${wrap}>` : i).join(jn)

const generateSites = (sites) => sites.map(i => i.url && i.title ? `<li><a href="${i.url}" target="_blank">${i.title}</a></li>` : i).join('')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const getMonth = (i) => months[i-1]

const reportDate = (site) => `${site.year}, ${getMonth(site.month)}`

module.exports = {
  template,
  wrapLines,
  generateSites,
 reportDate,
}

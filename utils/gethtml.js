const path = require('path')
var url = require('url');
const crawlerSource = require('./index');

const getNoQueryUrl = url => url.split('?')[0]
const formatFilePath = path => path.replace('http:\/\/', "http/")

async function getHtml(uri, baseFilePath = '../crawlerPage/') {
  if (!uri) {
    return {
      code: 0,
      message: 'url不能为空',
    };
  }

  const { code, crawler } = await crawlerSource({
    uri,
    fileName: formatFilePath(baseFilePath + getNoQueryUrl(uri).replace(/\/$/, '') + '.html')
  });

  if (code == 1) {
    const { $ } = crawler
    let html = $.html()
    let sources = html.match(/src=".+?"|href=".+?"/g).map(i => i.replace(/.*"(.+?)"/g, '$1'))
    sources.forEach(async link => {
      const { host, pathname } = url.parse(link)
      if (!pathname || /[^a-zA-Z\d\.\/:]/.test(pathname)) return
      const { name, ext } = path.parse(link)
      if (ext) {

        if (/http:|https:/.test(link)) {
          await crawlerSource({
            uri: link,
            fileName: formatFilePath(baseFilePath + link.replace(/(.*[^\/])(\/)?\?(.*)/, '$1'))
          })
        } else if (/^\/\//.test(link)) {
          let uri = 'https:' + link
          await crawlerSource({
            uri,
            fileName: formatFilePath(baseFilePath + uri.replace(/(.*[^\/])(\/)?\?(.*)/, '$1'))
          })
        } else if (/^\//.test(link)) {

          // protocol: 'http:',
          // slashes: true,
          // auth: null,
          // host: 'www.lakeshore-capital.cn',
          // port: null,
          // hostname: 'www.lakeshore-capital.cn',
          let { protocol, hostname } = url.parse(uri)

          await crawlerSource({
            uri: `${protocol}//${hostname}` + path.join('/', link),
            fileName: formatFilePath(baseFilePath + pathname.replace(/\/$/, ''))
          })
        } else if (link) {
          await crawlerSource({
            uri: getNoQueryUrl(uri) + path.join('/', link),
            fileName: formatFilePath(baseFilePath + pathname.replace(/\/$/, ''))
          })
        }
      }
    });
  }

}

module.exports = getHtml;
const path = require('path')
var url = require('url');
const crawlerSource = require('./index');


async function getHtml(uri, baseFilePath = '../crawlerPage/') {
  if (!uri) {
    return {
      code: 0,
      message: 'url不能为空',
    };
  }
  console.log(baseFilePath + uri.replace(/\/$/, ''))
  const {code, crawler} = await crawlerSource({
    uri,
    fileName: baseFilePath + uri.replace(/\/$/, '')
  });

  if (code == 1){
    const {$} = crawler
    let html = $.html()
    let sources = html.match(/src=".+?"|href=".+?"/g).map(i => i.replace(/.*"(.+?)"/g, '$1'))
    sources.forEach(async link => {
      const {host, pathname} = url.parse(link)
      if(!pathname || /[^a-zA-Z\d\.\/:]/.test(pathname)) return
      const {name, ext} = path.parse(link)
      if (ext) {

        if (/http:|https:/.test(link)) {
          await crawlerSource({
            uri: link,
            fileName: baseFilePath + link.replace(/(.*[^\/])(\/)?\?(.*)/, '$1')
          })
        } else if (/^\/\//.test(link)) {
          let uri = 'https:' + link
          await crawlerSource({
            uri,
            fileName: baseFilePath + uri.replace(/(.*[^\/])(\/)?\?(.*)/, '$1')
          })
        } else if (link) {
          await crawlerSource({
            uri: uri + path.join('/',link),
            fileName: baseFilePath + pathname.replace(/\/$/, '')
          })
        }
      }
    });
  }

}

module.exports = getHtml;
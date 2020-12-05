const  getHtml = require('./utils/gethtml');

['http://www.lakeshore-capital.cn/',
  'http://www.lakeshore-capital.cn/about/list/?MID=81',
  'http://www.lakeshore-capital.cn/invest/style/',
  'http://www.lakeshore-capital.cn/business/huan/',
  'http://www.lakeshore-capital.cn/news/',
  'http://www.lakeshore-capital.cn/contact/'
].forEach(url => {
    getHtml(url)
    // console.log(url)
  });

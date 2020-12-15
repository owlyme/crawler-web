const getHtml = require('./utils/pup');

[
  "https://www.hyc.cn/index/main/#a3"
].forEach(url => {
  getHtml(url)
});
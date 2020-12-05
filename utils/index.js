var Crawler = require('crawler');
var fs = require('fs');
var fse = require('fs-extra');

const path = require('path')
var c = new Crawler({
  encoding: null,
  jQuery: {
    name: 'cheerio',
    options: {
      normalizeWhitespace: true,
      xmlMode: true,
      decodeEntities: false,
    },
  },
  callback: function(err, res, done) {
    if (err) {
      console.error(err.stack);
      res.options.crawlerOK({
        code: 0,
        err,
      });
    } else {
      res.options.crawlerOK({
        code: 1,
        crawler: res,
      });
      let fileName = path.join(__dirname, res.options.fileName)
      fse.ensureFileSync(fileName)
      fs.createWriteStream(fileName).write(res.body);
    }

    done();
  },
});

function crawler(arg = {}) {
  return new Promise(resolve => {
    c.queue({
      ...arg,
      async crawlerOK($) {
        resolve($);
      },
    });
  });
}

module.exports = crawler;
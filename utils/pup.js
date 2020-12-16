const puppeteer = require('puppeteer-core');
const fs = require('fs');
const mkdirp = require('mkdirp');
const DEBUG = false;
const gameName = '';
const blackList = [];
// 案例参考地址 https://zhuanlan.zhihu.com/p/147338622
const getWebSource = async(url, baseFilePath = './crawlerPage', executablePath) => {

  const browser = await puppeteer.launch({
    executablePath, //本机chrome路径
    devtools: true, //调试打开浏览器
  });
  const outDir = baseFilePath
  const gameDir = outDir + '/' + gameName;
  const page = await browser.newPage();

  page.on('request', function(request) {
      const url = request.url();
      if (blackList && blackList.length > 0) {
        for (let i in blackList) {
          if (url.indexOf(blackList[i]) > -1) {
            request.abort();
            return;
          }
        }
      }
      request.continue();
    })
    //将响应内容保存到本地
  page.on('response', function(response) {
    const url = response.url();
    const status = response.status()

    //状态码判断
    if (status < 200 || status >= 300) {
      console.log('Get Warning:', status, url);
      return;
    }
    if (url.split("://").length < 2) {
      // console.log('Save Error:', url);
      return;
    }
    const filename = url.split("://")[1].split("?")[0];
    const dir = filename.substr(0, filename.lastIndexOf('/'));

    response.buffer().then((body) => {
      mkdirp(gameDir + '/' + dir).then(res => {
        fs.writeFile(gameDir + '/' + filename, body, function(e) {});
      })
    })
  });

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitFor(10000);
  await browser.close();
}


const getWebSiteSource = (executablePath, outputPath = './crawlerPage') => {
  if (!executablePath) {
    console.error("你可能没有经安装 chrome 浏览器, 或者没有配置正确的执行路径");
    return;
  }

  return pathes => {
    if (!Array.isArray(pathes)) {
      console.error("请以数组的格式传入路径参数");
      return;
    }
    pathes.forEach(url => {
      getWebSource(url, outputPath, executablePath)
    });
  }

};

module.exports = getWebSiteSource
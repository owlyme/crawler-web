const getWebSiteSource = require('./utils/pup');

// 配置 chrome 安装路径
const executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe"

let getSource = getWebSiteSource(executablePath);

getSource([
  "http://www.moligroup.com/hlh/"
])
var fs = require('fs');
var globalConf = require('./config');

var fileName = './' + globalConf.log_path + globalConf.log_name;
function log(data) {
    // 异步写入文件内容
    // fs.writeFile(fileName, data + '\n', {flag: 'a'}, function(){});
    // 异步追加文件内容
    console.log(data);
    fs.appendFile(fileName, data + '\n', {flag: 'a'}, function(){});
}

module.exports = log;
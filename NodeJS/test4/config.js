var fs = require('fs');

var globalConf = {};
var conf = fs.readFileSync('./server.conf').toString();
var configs = conf.split('\r\n');
for(var i = 0; i < configs.length; i++) {
    globalConf[configs[i].split('=')[0]] = configs[i].split('=')[1];
}
if(globalConf.static_file_type) {
    globalConf.static_file_type = globalConf.static_file_type.split('|');
}else {
    throw new Error('配置文件异常,缺少:static_file_type');
}
module.exports = globalConf;

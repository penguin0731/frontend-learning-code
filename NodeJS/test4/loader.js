var fs = require('fs');
var globalConf = require('./config');
var controllerSet = [];
var pathMap = new Map();
// readdirSync 同步读取文件夹
var files = fs.readdirSync('./' + globalConf.web_path);
for(var i = 0; i < files.length; i++) {
    var temp = require('./' + globalConf.web_path + files[i]);
    if(temp.path) {
        for(var [key, value] of temp.path) {
            // console.log(key, value);
            if(pathMap.get(key) == null) {
                pathMap.set(key, value);
            }else {
                throw new Error('url path异常,url:' + key);
            }
            controllerSet.push(temp);
        }
    }
}
// console.log(pathMap);
// console.log(controllerSet);

module.exports = pathMap;

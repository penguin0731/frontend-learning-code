var fs = require('fs');
var globalConfig = require('./config');
var controllerSet = [];
var pathMap = new Map();

function init(app) {
    var files = fs.readdirSync('./' + globalConfig.web_path);  //读取web文件夹
    for(var i = 0; i < files.length; i++) {
        var temp = require('./' + globalConfig.web_path + '/' + files[i]);
        if(temp.path) {
            for(var [key, value] of temp.path) {
                // console.log(key, value);
                if(pathMap.get(key) == null) {
                    pathMap.set(key, value);
                    app.get(key, value);
                }else { //如果存在这个接口，则抛出异常
                    throw new Error('url path异常,url:' + key);
                }
                controllerSet.push(temp);
            }
        }
    }
}
module.exports.init = init;

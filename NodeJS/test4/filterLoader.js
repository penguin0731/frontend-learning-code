var fs = require('fs');
var globalConf = require('./config');
var filterSet = []; //拦截器的集合

var files = fs.readdirSync(globalConf.filter_path);
for(var i = 0; i < files.length; i++) {
    var temp = require('./' + globalConf.filter_path + files[i]);
    filterSet.push(temp);
}

module.exports = filterSet;
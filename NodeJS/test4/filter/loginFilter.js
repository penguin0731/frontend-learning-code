var url = require('url');
var globalConf = require('../config');

function loginFilter(request, response) {
    var pathName = url.parse(request.url).pathname; //请求的路径
    if(pathName == '/login.html' || pathName == '/login' || isStaticRequest(pathName)) {
        console.log("放行");
        return true;
    }
    if(request.headers.cookie) {
        var cookies = request.headers.cookie.split(';');
        for(var i = 0; i < cookies.length; i++) {
            if(cookies[i].split('=')[0].trim() == 'id') {
                return true;
            }
        }
    }
    console.log("拦截")
    response.writeHead(302, {"location": "./login.html"});
    response.end();
    return false;
}

function isStaticRequest(pathName) {
    for (var i = 0; i < globalConf.static_file_type.length; i++) {
        var temp = globalConf.static_file_type[i];
        if(temp == '.html') {
            continue;
        }
        if (pathName.indexOf(temp) == pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}
module.exports = loginFilter;
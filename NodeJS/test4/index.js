var http = require('http');
var url = require('url');
var fs = require('fs');
var globalConf = require('./config');
var loader = require('./loader');
var filterSet = require('./filterLoader')
var log = require('./log');

// 底层用的是net
http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname; //请求的路径
    var params = url.parse(request.url, true).query; //请求的参数
    var isStatic = isStaticRequest(pathName); //是否是静态文件
    log(pathName);
    for(var i = 0; i < filterSet.length; i++) {
        var flag = filterSet[i](request, response);
        if(!flag) {
            return;
        }
    }
    if (isStatic) {  //请求静态文件
        try {
            var file = fs.readFileSync(globalConf.page_path + pathName);
            response.writeHead(200);    //响应头
            response.write(file);
            response.end();
        } catch (e) {
            response.writeHead(404);    //响应头
            response.write("<html><body><h1>404 NotFound</h1></body></html>");  //响应体
            response.end();     //结束响应
        }
    } else { //请求动态的数据
        if (loader.get(pathName) != null) {
            // 请求数据时，若程序出现错误不能影响整个服务器的运行
            // 因此用try/catch捕获错误
            try {
                loader.get(pathName)(request, response);
            } catch (e) {
                response.writeHead(500);
                response.write("<html><body><h1>500 BadServer</h1></body></html>");
                response.end();
            }
        } else {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>");
            response.end();
        }
    }
}).listen(globalConf.port);
log('服务已启动');

function isStaticRequest(pathName) {
    for (var i = 0; i < globalConf.static_file_type.length; i++) {
        var temp = globalConf.static_file_type[i];
        if (pathName.indexOf(temp) == pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}
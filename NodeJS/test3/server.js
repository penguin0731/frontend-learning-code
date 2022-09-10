var net = require('net');
var fs = require("fs");
var globalConf = require('./config');

var server = net.createServer();
server.listen(globalConf.port, '127.0.0.1');

server.on('listening', function () {
    console.log('服务已启动');
});
server.on('connection', function (socket) {
    socket.on('data', function (data) {
        var url = data.toString().split('\r\n')[0].split(' ')[1];
        try {
            var dataFile = fs.readFileSync(globalConf.basePath + url);
            socket.write('HTTP 200OK\r\n\r\n');
            socket.write(dataFile);
        } catch (e) {
            console.log('找不到文件');
            socket.write('HTTP 404NotFound\r\n\r\n<html><body><h1>404NotFound</h1><body></html>');
        }
        socket.end();
    });
});
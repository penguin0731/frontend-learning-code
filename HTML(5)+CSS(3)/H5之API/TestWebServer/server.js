// 四行代码写一个服务器
// 在该路径下执行node server.js,打开浏览器输入127.0.0.1:8080
var express = require('express');

var app = new express();

app.use(express.static('./page'));
// WebServer默认访问80端口
app.listen(9090);
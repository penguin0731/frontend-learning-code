var net = require('net');
var socket = net.connect(12306, "127.0.0.1");
// 设置超时时间
socket.setTimeout(2000);

// 连接到服务器时触发
socket.on('connect', function () {
    console.log('已连接到服务器');
    // // 服务器地址
    // console.log(socket.remoteAddress);
    // // 服务器端口
    // console.log(socket.remotePort);
    // // 本地地址
    // console.log(socket.localAddress);
    // // 本地端口
    // console.log(socket.localPort);
});

// 发送消息到服务端
socket.write('hello server!');

socket.on('timeout', function () {
    console.log('超时了'); 
    socket.end();
});

// // 接收服务端发送的消息
// socket.on('data', function (data) {
//     console.log(data.toString());
//     socket.end();
// });
// socket.on('close', function () {
//     console.log('连接已关闭');
// });
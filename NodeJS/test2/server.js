var net = require('net');
// 创建服务
var server = net.createServer();
// 监听本机 端口12306
server.listen(12306, "127.0.0.1");
// 监听服务是否已启动
server.on('listening', function () {
    console.log('服务已启动');
});

// 当有新的连接时触发
server.on('connection', function (socket) {
    // 谁连接了服务,socket就是谁
    console.log('有新的连接');
    // 客户端发送消息时触发
    socket.on('data', function (data) {
        // 打印客户端发送的消息
        console.log(data.toString());
        // 发消息到客户端
        socket.write('hello client!');
        // 客户端关闭时触发
        socket.on('close', function () {
            console.log('客户端已关闭');
            // 当客户端关闭时,也关闭服务端
            server.close();
        });
    });
});
// 服务端关闭时触发
server.on('close', function () {
    console.log('服务已关闭');
});
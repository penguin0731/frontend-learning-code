var mysql = require('mysql');
function createConnection () {
    var connection = mysql.createConnection({
        host: '127.0.0.1', //ip(本机)
        port: '3306', //端口
        user: 'root', //用户名
        password: '123456', //密码
        database: 'school'
    });
    // 在dao文件下，一个dao文件对应一张表的操作
    return connection;
}


module.exports.createConnection = createConnection;
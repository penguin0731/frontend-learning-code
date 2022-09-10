var createConnection = require("./dbUtil")

var conn = createConnection();

//打开连接
conn.connect();

//关闭连接
conn.end();
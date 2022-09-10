var createConnection = require("../dao/dbUtil")

//1. 添加多个学生
/**
 * students：数组，每一项是一个学生对象(name、sex、birth、phone、address)
 */
exports.addStudents = function (students) {
    var conn = createConnection(); //创建连接
    conn.connect(); //打开连接
    for (const stu of students) {
        //执行sql语句，将stu中的信息加入到数据库
        var sql = "insert into student(`name`,`sex`,`birth`,`phone`,`address`) values(?,?,?,?,?)";
        var params = [stu.name, stu.sex, stu.birth, stu.phone, stu.address];//为占位符(sql参数)提供数据
        conn.query(sql, params); //执行sql语句
    }

    conn.end(); //关闭连接
}

//2. 分页查询学生
/**
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 * callback: 查询完成后的回调函数，函数参数为学生数组
 */
exports.getStudents = function (page, pageSize, callback) {
    var conn = createConnection();
    conn.connect();

    var sql = "select * from student limit ?,?";
    var params = [(page - 1) * pageSize, +pageSize];
    conn.query(sql, params, function (err, results) {
        callback(results);
    })

    conn.end();
}

/**
 * 查询学生总数
 * callback: 查询完成后的回调
 */
exports.count = function(callback){
    var conn = createConnection();
    conn.connect();

    var sql = "select count(id) as val from student";
    conn.query(sql, function (err, results) {
        callback(results[0].val);
    })

    conn.end();
}
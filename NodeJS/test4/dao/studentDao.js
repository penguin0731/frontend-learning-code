var dbutil = require('./dbutil');
function queryAllStudent(success) {
    var querySql = 'select * from student;';
    var connection = dbutil.createConnection();
    // 每次查询数据库时都需要先创建连接，完毕之后关闭连接
    // 否则每次查询都创建连接而没有关闭，会占用系统资源
    connection.connect(); //创建连接
    connection.query(querySql, function (error, result) { //回调的两个参数分别为error和result
        // 有error则没有result，两者互斥
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end(); //关闭连接
}

function querryStudentByClassAndAge(className, age, success) {
    // 不要再查询语句里拼接参数，因为这样会导致mysql注入
    var querySql = 'select * from student where class = ? and age = ?;'; //问号说明需要传参
    var connection = dbutil.createConnection();
    var queryParams = [className, age];
    connection.connect(); 
    // 在查询语句和回调函数之间将参数以数组形式传入
    connection.query(querySql, queryParams, function (error, result) { 
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end(); 
}

function queryStudentByStuNum (stuNum, success) {
    var querySql = 'select * from student where stu_num = ?;';
    var connection = dbutil.createConnection();
    connection.connect(); 
    // 在查询语句和回调函数之间将参数以数组形式传入
    connection.query(querySql, stuNum, function (error, result) { 
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports = {
    queryAllStudent,
    querryStudentByClassAndAge,
    queryStudentByStuNum
}
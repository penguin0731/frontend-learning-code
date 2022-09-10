var dbutil = require("./dbutil");

//查询所有学生
function getAllStudent(success) {
    var querySql = 'select * from student';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if(error == null) {
            // console.log(result);
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}

//新增学生
function insertStudent(stu_num, name, age, pwd, success) {
    var insertSql = 'insert into student(stu_num, name, age, password) values(?, ?, ?, ?)';
    var params = [stu_num, name, age, pwd];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            // console.log(result);
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}

// 通过学号查询学生的密码
function queryStudentByStuNum(stu_num, success) {
    var querySql = 'select * from student where stu_num = ?;';
    var params = [stu_num];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            console.log(result);
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {
    getAllStudent,
    insertStudent,
    queryStudentByStuNum
}

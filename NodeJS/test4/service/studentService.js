var studentDao = require('../dao/studentDao');

function queryAllStundent (success) {
    studentDao.queryAllStudent(success);
}

function queryStudentByStuNum (stuNum, success) {
    studentDao.queryStudentByStuNum(stuNum, success);
}

module.exports = {
    queryAllStundent,
    queryStudentByStuNum
}
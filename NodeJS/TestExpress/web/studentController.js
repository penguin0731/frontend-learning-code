var url = require("url");
var studentDao = require("../dao/studentDao");
var fs = require("fs");
var path = new Map();

function getAllStudent(request, response) {
    studentDao.getAllStudent(function (result) {
        var resp = {msg: '查询成功', data: result}
        response.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "X-Requested-With",
            // "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
            // "X-Powered-By": "3.2.1",
        });
        response.write(JSON.stringify(resp));
        response.end();
    })
}
//设置接口
path.set('/api/getAllStudent', getAllStudent);

function insertStudent(request, response) {
    var params = url.parse(request.url,true).query;
    studentDao.insertStudent(params.stu_num, params.name, params.age, params.pwd, function (result) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("添加成功");
        response.end();
    })
}
path.set('/api/insertStudent', insertStudent);

function login(request, response) {
    var params = url.parse(request.url,true).query;
    studentDao.queryStudentByStuNum(params.stuNum, function (result) {
        if (result && result.length > 0 && result[0].password == params.pwd) {
            // 若存在结果且长度大于0且密码输入正确,则
            // 写cookie
            response.cookie('id', result[0].id);
            // 重定向
            response.redirect('/api/getAllStudent');
        }else {
            response.redirect('/loginError.html');
        }
    });
}
path.set('/login', login);

function getImg(request, response) {
    var params = url.parse(request.url,true).query;
    try {
        var data = fs.readFileSync('./' + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    }catch (e) {
        response.writeHead(404);
        response.end();
    }
}
path.set('/getImg', getImg);

module.exports.path = path;

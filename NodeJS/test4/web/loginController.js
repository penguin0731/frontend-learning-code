var studentService = require('../service/studentService');
var url = require('url');

var path = new Map();

function getData(request, response) {
    response.writeHead(200);
    response.write('hello');
    response.end();
    // throw new Error('aaaa');
}
path.set('/getData', getData);

function getAllStudent(request, response) {
    studentService.queryAllStundent(function (result) {
        var resArr = [];
        for (var i = 0; i < result.length; i++) {
            resArr.push(result[i].name);
        }
        response.write(resArr.toString());
        response.end();
    })
}
path.set('/getAllStudent', getAllStudent);

function login(request, response) {
    // var params = url.parse(request.url, true).query;
    request.on('data', function (data) {
        var stuNum = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];
        studentService.queryStudentByStuNum(stuNum, function (result) {
            var res = '';
            if (result == null || result.length == 0) {
                res = 'Fail';
            } else {
                if (result[0].password == password) {
                    res = 'OK';
                    //重定向
                    response.writeHead(302, {"location": "./main.html", "set-Cookie": "id=" + result[0].id});
                    response.end();
                } else {
                    res = 'Fail';
                    response.writeHead(302, {"location": "./error.html"});
                    response.end();
                }
            }
            // response.write(res);
            // response.end();
        })
    })
}
path.set('/login', login);
module.exports.path = path;
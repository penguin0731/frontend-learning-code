var express = require('express');
var glbalConfig = require('./config');
var loader = require('./loader');
var cookie = require('cookie-parser');
var multer = require('multer');
var userImgDao = require('./dao/userImgDao');

var app = new express();
app.use(express.static(glbalConfig.page_path));  //静态文件的路径
app.use(cookie());

var uploadSingle = multer({dest: './file/'});  //配置multer,文件上传到file文件夹

app.get('/api/*', function (request, response, next) {  //拦截api下的所有接口
    // console.log(request.cookies);
    if(request.cookies.id) {    //如果cookie里有id则放行
        next();
    }else {     //否则拦截并重定向到登录页面
        response.redirect('/login.html');
    }
});

loader.init(app);   //处理get请求接口

//因为上传文件的方式是post,所以从loader.init中独立出来
//post参数：接口, 用什么方法解析附件, 回调函数
app.post("/upload", uploadSingle.single("file"), function (request, response) {
    console.log(request.file.originalname); //上传的文件名
    console.log(request.file.size); //上传的文件大小
    console.log(request.file.path); //文件存储的路径
    console.log(request.body);
    // 两种传参方式
    // 1.拼接到url后面，将request.url转换成url对象，找到query属性，拿到参数
    // 2.放在form表单里，request的数据体(body)传上来的request.body.xxx
    userImgDao.insertUserImg(request.body.name, request.file.path, request.file.originalname, request.file.size, function (result) {
        var resp = {
            path: request.file.path,
        }
        response.writeHead(200);
        response.write(JSON.stringify(resp));
        response.end();
    });

});   //single里传的name要与upload.html11行的name一致

app.listen(glbalConfig.port);

// 文件的下载分为两种情况
// 1.展示在页面里
// 2.作为文件下载到本地

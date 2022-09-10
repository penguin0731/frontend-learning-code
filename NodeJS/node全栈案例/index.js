var express = require("express");

var app = express(); 

app.use(express.static("public")); //映射静态资源的位置

// 当请求地址以/api/student开头时，交给路由 student 处理
app.use("/api/student", require("./router/student"))

app.listen(9527);
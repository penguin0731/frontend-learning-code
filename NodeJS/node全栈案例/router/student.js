//专门处理访问学生的接口
var express = require("express");
var stuService = require("../service/studentService")
var router = express.Router(); //得到一个路由对象

//配置路由规则

router.get("/", function (req, res) {
    //获取page 和 pageSize
    var page = req.query.page || 1; //默认为1
    var pageSize = req.query.pageSize || 10; //默认为10
    stuService.getStudents(page, pageSize, function (results) {
        stuService.count(function (total) {
            res.send({
                datas: results,
                total: total
            })
        })
    })
})

module.exports = router;
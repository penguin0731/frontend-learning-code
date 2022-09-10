var Mock = require("mockjs") //mockjs专门用于模拟数据
var stuService = require("../service/studentService")
//返回模拟的数据
var mockData = Mock.mock({ //模拟的数据模板
    "datas|300-400": [{
        name: "@cname", //@cname 表示随机生成一个中文姓名
        "sex|0-1": 0,
        birth: "@date(yyyy-MM-dd)",
        phone: /1\d{10}/ ,
        address: "@city(true)"
    }]
})

var students = mockData.datas;
stuService.addStudents(students);
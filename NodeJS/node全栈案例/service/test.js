var stuService = require("./studentService")

// stuService.getStudents(2, 5, function (results) {
//     console.log(results);
// })

stuService.count(function(val){
    console.log(val);
})
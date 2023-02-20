// "use strict"

// var a = function foo() {
//     foo = 1;
//     console.log(foo);
// }
// a();
// console.log(foo);


var a = 0;
{
    a = 1;
    function a() {}
    a = 21;
    console.log("里面a：" + a);
}
console.log("外面a：" + a);



// "use strict";

// var a = function foo() {
//     foo = 1;
//     console.log(foo);
// }
// a();
// console.log(foo);

// 不同浏览器表现不同
// 这是因为浏览器要兼容旧代码导致的
var a = 0;
{
    a = 1;
    function a() {}
    a = 21;
    console.log(a);
}
console.log(a);
// 下面以 chrome 为例解析
/**
 * 1. 创建全局执行上下文GO，变量a声明提升
 * GO: {
 *  a: undefined
 * }
 * 
 * 2. 创建块级上下文AO，函数a声明提升
 * GO: {
 *  a: undefined
 * }
 * AO: {
 *  a: function a() {}
 * }
 * 
 * 3. 执行代码，GO中的变量a赋值为0
 * GO: {
 *  a: 0
 * }
 * AO: {
 *  a: function a() {}
 * }
 * 
 * 4. 执行代码，AO中的变量a赋值为1
 * GO: {
 *  a: 0
 * }
 * AO: {
 *  a: 1
 * }
 * 5. 执行 function a(){} 代码，将AO中的a变量的值同步到GO中a变量的值
 * GO: {
 *  a: 1
 * }
 * AO: {
 *  a: 1
 * }
 * 
 * 6. 执行代码，AO中的变量a赋值为21
 * GO: {
 *  a: 1
 * }
 * AO: {
 *  a: 21
 * }
 * 
 * 7. 执行代码，块级作用域中的输出语句为21，全局作用域的输出语句为1
 * 
 */


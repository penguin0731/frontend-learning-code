// 关于promise面试


// 1. 结果是?
// new Promise(() => {
//     console.log(1);
// });
// console.log(2);
// 答: 1 2
// Promise的执行是同步


// 2. 结果是?
new Promise((res, rej) => {
    console.log(1);
    // 这里不调用不执行
    res();
    console.log(4);
}).then(() => {
    console.log(3);
});
console.log(2);
// 答: 1 2 3
// resolve不调用不执行,并且是异步执行


// 3. 结果是?
// new Promise((res, rej) => {
//     console.log(1);
//     // 这里相当于执行rej
//     throw new Error('cxj');
// }).then(() => {
//     console.log(3);
// }, () => {
//     console.log(4)
// });
// console.log(2);
// 答: 1 2 4
// 抛异常,如果有rej,自动执行rej,如果没有rej,会寻找链路上最近的catch
// 如果没有catch,则报错


// 4. 结果是?
// new Promise((res, rej) => {
//     console.log(1);
//     // 这里相当于执行rej
//     throw new Error('cxj');
// }).then(() => {
//     console.log(3);
// }, () => {
//     console.log(4)
// }).catch(() => {
//     console.log(5)
// });
// console.log(2);
// 答: 1 2 4


// 5. 结果是?
// new Promise((res, rej) => {
//     console.log(1);
//     // 这里相当于执行rej
//     throw new Error('cxj');
// }).then(() => {
//     console.log(3);
// }).catch(() => {
//     console.log(5)
// });
// console.log(2);
// 答: 1 2 5


// 6. 结果是?
// try{
//     console.log(1);
//     throw new Error('cxj');
// }catch(e) {
//     console.log(3);
// }
// console.log(2);
// 答: 1 3 2


// 7. 答案是?
// try{
//     console.log(1);
//     setTimeout(function () {
//         throw new Error('cxj');
//     }, 0);
// }catch(e) {
//     console.log(3);
// }
// console.log(2);
// 答: 1 2 报错
// try catch只能捕获当前线程的异常,不能捕获异步的异常

// H5前
// 我们所说的JS是单线程,指的是JS只有一个线程负责执行任务。
// 但是整个JS引擎是不可能只有一个线程的

// H5后出现worker
// JS本质上执行也不是单线程的

let fs = require('fs');
// error-first
// fs.readDir(读路径) fs.writeFile 异步方法
// node单线程
//形成回调地狱
// fs.readFile('./data/number1.txt', 'utf-8', (err, data) => {
//     fs.readFile(data, 'utf-8', (err, data) => {
//         fs.readFile()
//     })
// })


// promise化

function readFile(path) {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}
// readFile('./data/number.txt').then((val) => {}, (reason) => {})

// 其他异步操作
// function writeFile(path) {
//     return new Promise((res, rej) => {
//         fs.writeFile(path, 'utf-8', (err, data) => {
//             if(err) {
//                 rej(err);
//             }else {
//                 res(data);
//             }
//         });
//     });
// }


// function promisify(func) {
//     return function(...arg) {
//         return new Promise((res, rej) => {
//             func(...arg, (err ,data) => {
//                 if(err) {
//                     rej(err);
//                 }else {
//                     res(data);
//                 }
//             });
//         });
//     }
// }
//promise化的异步操作
// let readFile = promisify(fs.readFile);
// let writeFile = promisify(fs.writeFile);
// let readDir = promisify(fs.readDir);

// readFile('./data/number.txt', 'utf-8').then((val) => {
//     console.log(val);
// });


//可用fs上的所有方法,不需要再定义
// function promisifyAll(obj) {
//     for(let key in obj) {
//         let fn = obj[key];
//         if(typeof fn === 'function') {
//             obj[key + 'Async'] = promisify(fn);
//         }
//     }
// }
// promisifyAll(fs);
// fs.readFileAsync('./data/number.txt', 'utf-8').then((val) => {
//     console.log(val);
// });
//有一个库能实现同样的功能
// npm bluebird
// let bluebird = require('bluebird');
// bluebird.promisify(fs.readFile);

// function* read(url) {
//     let val1 = yield readFile(url);
//     let val2 = yield readFile(val1);
//     let val3 = yield readFile(val2);
//     return val3;
// }
// function Co(oIt) {
//     return new Promise((res, rej) => {
//         let next = (data) => {
//             let { value, done } = oIt.next(data);
//             if (done) {
//                 res(value);
//             } else {
//                 value.then((val) => {
//                     next(val);
//                 }, rej);
//             }
//         }
//         next();
//     });
// }
// Co( read('./data/number.txt') ).then((val) => {
//     console.log(val);
// });


//更加优雅的解决回调地狱
// async+await是Generator语法糖
// 将函数变为异步函数
// async function read(url) {
//     // 返回的是Promise对象
//     // let val1 = readFile(url);
//     //加上await后,会等待结果再将结果赋值给val1
//     try{
//         let val1 = await readFile(url);
//         let val2 = await readFile(val1);
//         let val3 = await readFile(val2);
//         return val3;
//     }catch(e) {
//         console.log(122, e);
//     }
// }
// read('./data/number.txt').then((val) => {
//     console.log(val);
// });

// 同步并发的异步结果
// Promise.all
// async+await
// async function read1() {
//     let val1 = null;
//     try {
//         val1 = await readFile('./data/number.txt');
//     } catch (e) {
//         console.log(e);
//     }
// }
// async function read2() {
//     let val2 = null;
//     try {
//         val2 = await readFile('./data/number.txt');
//     } catch (e) {
//         console.log(e);
//     }
// }
// function readAll(...args) {
//     args.forEach((ele) => {
//         ele();
//     })
// }
// readAll(read1, read2);

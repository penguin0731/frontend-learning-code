//配合Promise解决回调地狱的问题
//需要在node环境下运行
//在该路径下 node Generator.js 执行
let fs = require('fs');
function readFile(path) {
    return new Promise((res, rej) => {
        //读取文件 异步操作
        fs.readFile(path, 'utf-8', (err, data) => {
            if (data) {
                res(data);
            } else {
                rej(err);
            }
        });
    });
}
// readFile('./data/number.txt')
// .then((val) => {
//     return readFile(val);
// }).then((val) => {
//     return readFile(val);
// }).then((val) => {
//     console.log(val);
// });

//Generator函数
function* read() {
    let val1 = yield readFile('./data/number.txt');
    let val2 = yield readFile(val1);
    let val3 = yield readFile(val2);
    return val3;
}
// let oG = read();
// let { value, done } = oG.next();
// value.then((val) => {
//     let { value, done } = oG.next(val);
//     value.then((val) => {
//         let { value, done } = oG.next(val);
//         value.then((val) => {
//             console.log(val);
//         });
//     });
// });

//将以上代码进行递归优化
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
// Co(read()).then((val) => {
//     console.log(val);
// }, (reason) => {
//     console.log(reason);
// });

//有一个已经写好的库就是co,可以直接拿来用,原理跟上面一样
//在该路径下 npm init -y    npm install co 安装co库
let co = require('co');
co(read()).then((val) => {
    console.log(val);
});

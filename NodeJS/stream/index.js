const fs = require('fs');
const path = require('path');


// const filename = path.resolve(__dirname, './writefile/abc.txt');
// const ws = fs.createWriteStream(filename, {
//     encoding: 'utf-8',
//     highWaterMark: 3,
// });

// const flag = ws.write('写入数据');
// console.log(flag);

// // 造成背压问题
// for(let i = 0; i < 1024 * 1024; i++) {
//     ws.write('a');
// }

// 案例：将1M的文件abc.txt复制到一个新的文件abc2.txt
// // 方式1
// async function method1() {
//     const from = path.resolve(__dirname, './writefile/abc.txt');
//     const to = path.resolve(__dirname, './writefile/abc2.txt');
//     console.time('方式1');
//     const content = await fs.promises.readFile(from);
//     await fs.promises.writeFile(to, content);
//     console.timeEnd('方式1'); // 170.38ms
//     console.log('复制完成');
// }
// method1();

// // 方式2
// function method2() {
//     const from = path.resolve(__dirname, './writefile/abc.txt');
//     const to = path.resolve(__dirname, './writefile/abc2.txt');

//     console.time('方式2');
//     const rs = fs.createReadStream(from);
//     const ws = fs.createWriteStream(to);
    
//     rs.on('data', chunk => { // 读取一部分数据
//         const flag = ws.write(chunk); // 将数据写入文件
//         if (!flag) {
//             // 通道已满，下一次写入会造成背压
//             rs.pause(); // 暂停读取数据
//         }
//     });

//     ws.on('drain', () => { // 通道清空时
//         rs.resume(); // 恢复读取数据
//     });

//     rs.on('close', () => {
//         console.timeEnd('方式2'); // 17.087ms
//         console.log('复制完成');
//     })
// }
// method2();

// 方式3
function method3() {
    const from = path.resolve(__dirname, './writefile/abc.txt');
    const to = path.resolve(__dirname, './writefile/abc2.txt');

    console.time('方式2');
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    rs.pipe(ws);
    rs.on('close', () => {
        console.timeEnd('方式2');
        console.log('复制完成');
    })
}
method3();
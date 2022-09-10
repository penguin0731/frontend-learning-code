const fs = require('fs');
const path = require('path');


const filename = path.resolve(__dirname, './test.txt');
const rs = fs.createReadStream(filename, {
    // encoding: 'utf-8', // 读取流数据时的编码方式
    highWaterMark: 3
});

rs.on('open', () => {
    console.log('文件被打开了');
});

rs.on('error', () => {
    console.log('出错了');
});

rs.on('data', chunk => {
    console.log('读取到一部分数据：', chunk);
    // rs.pause(); // 暂停读取，触发pause事件
});

// rs.on('pause', () => {
//     console.log('数据暂停读取了');
//     setTimeout(() => {
//         rs.resume(); // 恢复读取，触发resume事件
//     }, 1000);
// });

// rs.on('resume', () => {
//     console.log('数据恢复读取了');
// });

rs.on('end', () => {
    console.log('数据读取完毕');
});

rs.on('close', () => {
    console.log('文件关闭了');
});


const fs = require("fs");
const path = require("path");
const os = require("os");

// bad
// fs.readFile('./1.txt');

// good
const filename = path.resolve(__dirname, './myFile/1.txt');
fs.readFile(filename, 'utf-8', (err, content) => {
    console.log(err, content)
});

// const filename = path.resolve(__dirname, './myFile/2.txt');
// const newline = os.EOL; // 换行符
// fs.writeFile(filename, `${newline}add something`, {
//     flag: 'a' // 表示添加内容，而不是覆盖
// }, err => {
//     if (err) throw err;
//     console.log('写入成功');
// });

// const filename = path.resolve(__dirname, './1.txt');
// fs.unlink(filename, (err) => {
//   if (err) throw err;
//   console.log('删除成功');
// });

// const filename = path.resolve(__dirname, './myFile/2.txt');
// fs.stat(filename, (err, stats) => {
//     console.log(stats.isDirectory());
//     console.log(stats);
// });

// const dirname = path.resolve(__dirname, './myFile');
// fs.readdir(dirname, (err, files) => {
//     console.log(files);
// });

// const dirname = path.resolve(__dirname, './myFile/sub');
// fs.mkdir(dirname, err => {
//     if (!err) {
//         console.log('文件夹创建成功');
//     }
// });

// const dirname = path.resolve(__dirname, './test');
// fs.rmdir(dirname, err => {
//   if (err) throw err;
//   console.log('文件夹删除成功');
// });

// class File {
//   constructor(filename, size, isFile, createTime, updateTime) {
//     this.filename = filename;
//     this.name = path.basename(filename);
//     this.ext = path.extname(filename);
//     this.size = size;
//     this.isFile = isFile;
//     this.createTime = createTime;
//     this.updateTime = updateTime;
//   }

//   // 读取文件内容
//   async getContent(isBuffer = false) {
//     if(this.isFile) {
//         const filename = path.resolve(this.filename);
//         if(isBuffer) {
//             return fs.promises.readFile(filename);
//         }else {
//             return fs.promises.readFile(filename, 'utf-8');
//         }
//     }
//     return null;
//   }

//   // 读取文件夹
//   async getChildren() {
//     if(this.isFile) return [];
//     let child = await fs.promises.readdir(this.filename);
//     child = child.map(name => {
//         const childname = path.resolve(this.filename, name);
//         return File.getFile(childname);
//     })
//     return Promise.all(child);
//   }

//   // 读取文件信息
//   static async getFile(filename) {
//     const file = await fs.promises.stat(filename);
//     const size = file.size;
//     const isFile = file.isFile();
//     const createTime = new Date(file.birthtime);
//     const updateTime = new Date(file.mtime);
//     return new File(filename, size, isFile, createTime, updateTime);
//   }
// }

// async function readDir(filename) {
//     const file = await File.getFile(filename);
//     return file.getChildren();
// }

// async function test() {
//   const dirname = path.resolve(__dirname, "./myFile");
//   const result = await readDir(dirname);
//   console.log(result);
// }

// test();

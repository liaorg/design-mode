// 文件模块
import fs from "node:fs";
// 基于 promise 的 API
// 当需要最大性能（在执行时间和内存分配方面）时，node:fs 模块 API 的基于回调的版本比使用 promise API 更可取
import pfs from "node:fs/promises";
// import { stat, readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { getType } from "mime";

// openSync 是同步阻塞的
// r  只读
// r+ 读写
// w+ 读写，将流定位到文件的开头，如果文件不存在则创建文件
// a  只写，将流定位到文件的结尾，如果文件不存在则创建文件
// a+ 读写，将流定位到文件的结尾，如果文件不存在则创建文件
const filename = __dirname + "/dev-readme.md";
fs.open(filename, "r", (err, fd) => {
    console.log(err, fd);
    fs.close(fd);
    // fd 是文件描述符。
});

// 获取文件属性 statSync 是同步阻塞的
fs.stat(filename, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("isFile", stats.isFile()); // 判断文件是否文件 true
    console.log("isDirectory", stats.isDirectory()); // 判断文件是否目录 false
    console.log("isSymbolicLink", stats.isSymbolicLink()); // 判断文件是否符号链接 false
    console.log("size", stats.size); // 获取文件的大小（以字节为单位） 1024000 //= 1MB
});

// async/await
async function getStats(filename: string) {
    try {
        // promise 的 API
        // 这里如果有异常，在catch里面做个基本处理，继续抛出，这样的话外层只要写一个try catch 说好了
        let stats = await pfs.stat(filename).catch((err) => Promise.reject(err));
        console.log("stats", stats);
    } catch (err) {
        // 统一处理异常
        if (typeof err === "function") {
            err();
        } else {
            console.error(err);
        }
    }
}
// getStats(`./${filename}`);
getStats("33");
// async/await 异常处理
/**
 * 高级的处理,接收一个promise和错误对象
 * 返回一个resolve状态的promise
 */
const catchAwait = (promise: Promise<any>, customerErr?: Error) => {
    return promise
        .then<[null, any]>((data) => [null, data])
        .catch<[Error, undefined]>((err) => {
            if (customerErr) {
                const parsedError = { ...err, ...customerErr };
                return [parsedError, undefined];
            }
            return [err, undefined];
        });
};
async function getStats2(filename: string) {
    let err: any;
    let result: any;
    [err, result] = await catchAwait(pfs.stat(filename));
    console.log(err, result);
    if (err) throw new Error(err);
}
getStats2(filename);

// await-to-js 异常处理的包
// export function to<T, U = Error>(
//     promise: Promise<T>,
//     errorExt?: object
// ): Promise<[U, undefined] | [null, T]> {
//     return promise
//         .then<[null, T]>((data: T) => [null, data])
//         .catch<[U, undefined]>((err: U) => {
//             if (errorExt) {
//                 const parsedError = Object.assign({}, err, errorExt);
//                 return [parsedError, undefined];
//             }

//             return [err, undefined];
//         });
// }
// export default to;

// 读写取文件
// 读文件 readFile()  readFileSync() 返回的是 Buffer 流
// writeFile() writeFileSync() appendFile()
async function getFileContent(filename: string) {
    let err: any;
    let result: any;
    [err, result] = await catchAwait(pfs.readFile(filename));
    // console.log(err, result.toString());
    console.log(err, result.length);
    if (err) throw new Error(err);
}
getFileContent(filename);

// 文件夹操作
// fs.access() 检查文件夹是否存在以及 Node.js 是否具有访问权限
// fs.mkdir() 创建新的文件夹 mkdirSync()
// fs.readdir() 读取目录的内容,并返回它们的相对路径
const isFile = (fileName: string) => {
    return fs.lstatSync(fileName).isFile();
};
const folderPath = "./src";
const srcFiles = fs
    .readdirSync(folderPath)
    .map((fileName) => {
        return path.join(folderPath, fileName);
    })
    .filter(isFile);
console.log("srcFiles", srcFiles);

// fs.rename() 重命名文件夹
// fs.rmdir() 删除文件夹, 只能删除空文件夹
// fs.rm(path[, options]) 删除文件和目录, options = { recursive: true, force: true }的效果类似 rm -rf
// fs-extra 模块为 fs 模块的替代

// 文件路径模块 path
const notes = `./${filename}`;
// path.parse() 包含以下函数的返回信息
console.log("dirname", path.dirname(notes)); // 获取路径的目录部分 .
console.log("basename", path.basename(notes)); // 获取文件名部分 dev-readme.md
const ext = path.extname(notes); // 获取文件的扩展名 .md
// basename 的第二个参数可以过滤掉文件的扩展名
console.log("basename", path.basename(notes, ext)); // dev-readme
// 使用 path.join() 连接路径的两个或多个片段
const name = "joe";
console.log("join", path.join("/", "users", name, "notes.txt")); // '/users/joe/notes.txt'
// 获得相对路径的绝对路径
console.log("resolve", path.resolve(filename)); // /home/pulin/learn-node/dev-readme.md
// 计算实际的路径 解析 .. 和 . 去除多余的 /
console.log("normalize", path.normalize("/users/joe/..//test.txt")); // '/users/test.txt'

// 操作系统模块 cpus() freemem() totalmem() loadavg() networkInterfaces() uptime()
console.log(os.cpus());

// 获取文件 MIME 类型
// npm install mime
// npm i--save - dev @types/mime
console.log(getType(notes));

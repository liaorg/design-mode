import { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";
import { readFile, createReadStream } from "node:fs";
import { join } from "node:path";
import { getType } from "mime/lite";

// 路由表
interface Route {
    // 任意属性
    [propName: string]: Function;
}
interface Routers {
    [propName: string]: Route;
}
let routers: Routers = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
};

// 判断是否存在请求处理服务
function isService(method: string, pathname: string) {
    return typeof routers[method][pathname] === "function";
}
/**
 * 高级的处理,接收一个promise和错误对象
 * 返回一个resolve状态的promise
 */
// const catchAwait = (promise: Promise<any>, customerErr?: Error) => {
//     return promise
//         .then<[null, any]>((data) => [null, data])
//         .catch<[Error, undefined]>((err) => {
//             if (customerErr) {
//                 const parsedError = { ...err, ...customerErr };
//                 return [parsedError, undefined];
//             }
//             return [err, undefined];
//         });
// };

// 获取项目根目录
const root = join(__dirname, "../");
// 普通文件读取
function getFile(filename: string, res: ServerResponse, is404 = false) {
    readFile(filename, "utf-8", (err, data) => {
        if (err) {
            // 状态码是 404
            res.statusCode = 404;
            const filename = `${root}static/404.html`;
            // 如果 404 页面找不到直接结束请求
            is404 && res.end();
            // 其他返回 404 页面
            getFile(filename, res, true);
        } else {
            // 设置 HTTP 头部
            // console.log(req.headers);
            const mimeType = getType(filename);
            res.setHeader("Content-Type", `${mimeType};charset=utf-8`);
            res.write(data);
            res.end();
        }
    });
}
// 以流方式读取文件
function getSteamFile(filename: string, res: ServerResponse) {
    // 大文件处理，ssr或者文件下载
    const stream = createReadStream(filename);
    stream.on("error", () => {
        const file404 = `${root}static/404.html`;
        getFile(file404, res);
    });
    // 设置 HTTP 头部
    // console.log(req.headers);
    const mimeType = getType(filename);
    res.setHeader("Content-Type", `${mimeType};charset=utf-8`);
    stream.pipe(res);
    // stream.on("data", (chunk) => {
    //     console.log("stream on data: %s bytes", chunk.length);
    // });
    // stream.on("end", () => {
    //     console.log("stream on end");
    // });
}

// 读取静态资源内容
function getStaticContent(filename: string, res: ServerResponse) {
    // return await catchAwait(readFile(filename, 'utf-8'));
    const path = `${root}${filename}`;
    // return buffer
    // getFile(path, res);
    // return stream
    getSteamFile(path, res);
}
// 动态添加路由
function addDynamicRoute(method: string, pathname: string, service: Function) {
    console.log(`add ${method} service: ${pathname}`);
    const upMethod = method.toUpperCase();
    if (!routers[upMethod]) {
        routers[upMethod] = {};
    }
    routers[upMethod][pathname] = service;
}
function get(pathname: string, service: Function) {
    addDynamicRoute("GET", pathname, service);
}
function post(pathname: string, service: Function) {
    addDynamicRoute("POST", pathname, service);
}
function del(pathname: string, service: Function) {
    addDynamicRoute("DELETE", pathname, service);
}
function put(pathname: string, service: Function) {
    addDynamicRoute("PUT", pathname, service);
}
// 路由分发
function route(req: IncomingMessage, res: ServerResponse) {
    // 获取主机地址
    // ?? 运算符称为 null /undefined合并运算符，用于定义可以为 null/undefined 值的类型和引用类型的默认值
    const host = req.headers?.host ?? "";
    const href = `https://${host}`;
    // 解析请求地址
    const urlinfo = new URL(req.url ?? "/", href);
    const pathname = urlinfo.pathname ?? "";
    const method = req.method?.toUpperCase() ?? "";
    console.log(req.method, pathname);
    // 判断是否存在请求处理服务
    if (isService(method, pathname)) {
        // 运行服务
        routers[method][pathname](req, res);
    } else {
        // 静态资源
        const filename = pathname.substring(1);
        getStaticContent(filename, res);
    }
}
export { addDynamicRoute as add, get, post, del, put, route };

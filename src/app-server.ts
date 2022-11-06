// const http = require("http");
import http from "node:http";

const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    req.on("todos", (error, data) => {
        if (error) {
            throw new Error("error");
        }
        console.log(data);
    });
    req.on("end", () => {
        // 数据结束
    });

    // 状态码是 200
    res.statusCode = 200;
    // 设置 HTTP 头部
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    // 发送响应数据
    res.end("Hello Nodejs World");
});

server.listen(port, hostname, () => {
    console.log("Server running at http://127.0.0.1:8081");
});

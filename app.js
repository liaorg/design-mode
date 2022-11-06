const http = require("http");
const hostname = "127.0.0.1";
const port = 8081;

const server = http.createServer((req, res) => {
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

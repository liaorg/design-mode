import { IncomingMessage, ServerResponse } from "node:http";
import { get, post, del, put, add } from "./router";

function init() {
    // 路由默认提供了 get post delete put 4类请求方法路由
    // 添加路由
    get("/", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });
    post("/todos", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });

    // 添加自定义请求方法路由
    // HEAD CONNECT OPTIONS TRACE
    add("CONNECT", "/todos", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });
}
export { init, get, post, del, put, add };

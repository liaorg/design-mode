import { IncomingMessage, ServerResponse } from "node:http";
import { get, post, del, put, add } from "./router";
import { carBill } from "./simple/car-trip";

function init() {
    // 路由默认提供了 get post delete put 4类请求方法路由
    // 添加路由
    get("/", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });
    post("/todos", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });

    // 获取打车金额
    get("/car-bill", (_req: IncomingMessage, res: ServerResponse) => {
        const bill = carBill();
        // res.end(`Hello ${req.url} ${JSON.stringify(bill)}`);
        res.end(JSON.stringify(bill));
    });

    // 添加自定义请求方法路由
    // HEAD CONNECT OPTIONS TRACE
    add("CONNECT", "/todos", (req: IncomingMessage, res: ServerResponse) => {
        res.end(`Hello World ${req.url}`);
    });
}
export { init, get, post, del, put, add };

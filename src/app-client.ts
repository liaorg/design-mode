// http 请求
// import http from "node:http";
import https from "node:https";
import axios from "axios";

const data = JSON.stringify({
    todo: "做点事情",
});

const options = {
    hostname: "127.0.0.1",
    port: 443,
    path: "/todos",
    method: "GET", // POST PUT DELETE
    headers: { "Content-Type": "application/json", "Content-Length": data.length },
};

// post() get()
const req = https.request(options, (res) => {
    console.log(`status ${res.statusCode}`);
    res.on("data", (d) => {
        process.stdout.write(d);
    });
});
req.on("error", (error) => {
    console.error(error);
});
req.write(data);
req.end();

// 或者使用 axios 库 npm install axios
axios
    .post("/todos", data)
    .then((res) => {
        console.log(`status ${res.status}`);
    })
    .catch((error) => {
        console.error(error);
    });

// async/await 形式
async function todos() {
    try {
        const res = await axios.post("/todos", data);
        console.log(`status ${res.status}`);
    } catch (error) {
        console.error(error);
    }
}
todos();

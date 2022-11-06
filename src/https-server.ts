import { readFileSync } from "node:fs";
import { createServer } from "node:https";
import { join } from "node:path";
import { route } from "./router";
import { cpus } from "node:os";
import cluster from "node:cluster";
import process from "node:process";

// 获取项目根目录
const root = join(__dirname, "../");
// 配置 ssl 证书
// 用以下命令生成证书和密钥
// openssl req -x509 -days 10950 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
const options = {
    key: readFileSync(`${root}/localhost-privkey.pem`),
    cert: readFileSync(`${root}/localhost-cert.pem`),
};
// 修改默认的 TLS 加密组件
// node --tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4' https-server.ts
// export NODE_OPTIONS=--tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4'

// 创建服务
const server = createServer(options, (req, res) => {
    // 路由处理
    route(req, res);
});

// 集群服务
const createClusterServer = function createClusterServer(port: number) {
    // 心跳检测，杀掉僵尸进程
    const pingPong = function pingPong(worker: any) {
        // 记录失败的心跳次数
        let missedPing = 0;
        function sendPing() {
            missedPing++;
            worker.send("ping");
            console.log(`${worker.process.pid} send ping ${missedPing}`);
            // 如果大于5次都没有得到响应说明可能挂掉了就退出
            if (missedPing > 5) {
                console.log(`died worker ${worker.process.pid}`);
                process.kill(worker.process.pid);
            } else {
                // 5 秒后再发送一个心跳
                setTimeout(sendPing, 5000);
            }
        }
        sendPing();
        // 如果接收到心跳响应就让失败次数 -1 回去
        worker.on("message", (msg: string) => {
            msg === "pong" && missedPing--;
            console.log(`${worker.process.pid} get pong ${missedPing}`);
        });
    };
    // 启动工作进程
    const createClusterWorker = function createClusterWorker() {
        // 记录 worker
        const worker = cluster.fork();
        // 心跳检测，杀掉僵尸进程
        pingPong(worker);
    };
    // 如果是主线程
    if (cluster.isPrimary) {
        // 多少个 cpu 启动多少个子进程
        let numCPUs = cpus().length;
        while (numCPUs > 0) {
            numCPUs--;
            // 启动工作进程
            createClusterWorker();
        }
        // 如果有线程退出了重新启一个
        cluster.on("exit", (worker) => {
            console.log(`worker ${worker.process.pid} died`);
            setTimeout(() => {
                // 启动进程
                createClusterWorker();
            }, 2000);
        });
    } else {
        // 子进程启动服务
        console.log(`worker ${cluster.worker.id}`);
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        // 心跳回应
        process.on("message", (msg) => {
            msg === "ping" && process.send("pong");
        });
        process.on("uncaughtException", (err) => {
            console.error(err);
            // 进程错误上报
            // 如果程序内存使用大于 xxxm 了让其退出，防止内存泄漏
            if (process.memoryUsage().rss > 734003200) {
                console.log(`mem exceeded 734003200, exit`);
                process.exit(1);
            }
            // 退出程序
            process.exit(1);
        });
    }
};
/**
 * @param port 监听端口
 * @param openCluster 是否开启集群
 */
export default function startServer(port = 8443, openCluster?: boolean) {
    if (openCluster) {
        createClusterServer(port);
    } else {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

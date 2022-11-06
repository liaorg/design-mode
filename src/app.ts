import startServer from "./https-server";
import * as router from "./route";

// npx ts-node src/app.ts
// pm2 start src/app.ts --interpreter="./node_modules/.bin/ts-node" --watch

// 初始化路由
router.init();

// const hostname = "127.0.0.1";
const port = 8443;
const openCluster = false;
startServer(port, openCluster);

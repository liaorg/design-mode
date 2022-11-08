### 环境准备

#### 安装开发环境

```
# eslint typescript alloy prettier
npm install --save-dev prettier eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
# 自动编译
# 终端->运行任务->typescript->tsc:监视-tsconfig.json
```

#### PM2 结合 Browsersync 实现 node.js 项目的全栈刷新

1. 全局安装 PM2

```shell
npm install pm2 -g
pm2 update
# --watch 监听文件变化自动重启
pm2 start app.js --watch
pm2 stop app
pm2 delete app
# 以配置文件的形式
# https://pm2.keymetrics.io/docs/usage/application-declaration/
pm2 init simple
pm2 start ecosystem.config.js --watch
# 日志查看
pm2 logs <api>
pm2 monit
# 清除 api 应用的日志
pm2 flush <api>

# 常用命令
pm2 start app.js -i 4 #后台运行pm2，启动4个app.js
                               # 也可以把'max' 参数传递给 start
                               # 正确的进程数目依赖于Cpu的核心数目
 pm2 start app.js --name my-api # 命名进程
 pm2 list               # 显示所有进程状态
 pm2 monit              # 监视所有进程
 pm2 logs               #  显示所有进程日志
 pm2 stop all           # 停止所有进程
 pm2 restart all        # 重启所有进程
 pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
 pm2 stop 0             # 停止指定的进程
 pm2 restart 0          # 重启指定的进程
 pm2 startup            # 产生 init 脚本 保持进程活着
 pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
 pm2 delete 0           # 杀死指定的进程
 pm2 delete all         # 杀死全部进程
```

2. 使用 ts-node 启动 node

```
npm install -g ts-node
ts-node app.ts
npm install -g ts-node-dev
ts-node-dev src/app.ts
```

3. 增加脚本

```
# 修改 package.json 文件中 scripts 增加命令
# "start": "pm2 start ecosystem.config.js"
npm start
```

#### Browsersync 结合 nodemon 实现 node.js 项目的全栈刷新

1. 全局安装 gulp：npm install -g gulp
2. 初始化项目生产 package.json: npm init
3. 安装项目依赖 : npm install --save-dev gulp browser-sync
4. 在项目的 gulpfile.js 中新建任务

```js
// gulp使用Browsersync
// https://browsersync.io/docs/gulp/
// gulpfile.js
// 结合gulp使用Browsersync
const gulp = require("gulp");
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理
const browserSync = require("browser-sync").create();
// 定义一个任务，任务的名字，该任务所要执行的一些操作
gulp.task("watch", () => {
    // 启动Browsersync服务。这将启动一个服务器，代理服务器（proxy）或静态服务器（server）
    browserSync.init({
        // 设置监听的文件，以gulpfile.js所在的根目录为起点，如果不在根目录要加上路径，单个文件就用字符串，多个文件就用数组
        files: ["*.html", "css/*.css", "js/*.js"],
        // 启动静态服务器，默认监听3000端口，设置启动时打开的index.html的路径
        server: {
            baseDir: "./",
        },
        // 在不同浏览器上镜像点击、滚动和表单，即所有浏览器都会同步
        ghostMode: {
            clicks: true,
            scroll: true,
        },
        // 更改控制台日志前缀
        logPrefix: "learning browser-sync in gulp",
        // 设置监听时打开的浏览器，下面的设置会同时打开chrome, firefox
        browser: ["chrome", "firefox"],
        // 设置服务器监听的端口号
        prrt: 8000,
    });
});
```

5. 使用 gulp-nodemon 插件代替 nodemon,使用 gulp-nodemon 启动 node 服务
   npm install --save-dev gulp-nodemon

```js
const { series } = require("gulp");
const nodemon = require("gulp-nodemon");
// 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理
const browserSync = require("browser-sync").create();
// Browsersync结合nodemon
// 这里reload不加括号，只引用不调用
var reload = browserSync.reload;
function server() {
    nodemon({
        script: "app.js",
        // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
        ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
        env: {
            NODE_ENV: "development",
        },
    }).on("start", () => {
        // 启动Browsersync服务
        // Browsersync会用http://localhost:8080来代理nodemon启动的主机地址
        browserSync.init(
            {
                files: ["app.js", "public/**/*.*", "views/**", "routes/**"],
                proxy: "http://localhost:8081",
                port: 8000,
                // browser: ["chrome"],
            },
            () => {
                console.log("browser refreshed.");
            },
        );
    });
}
exports.default = series(server);
// gulp
```

6. 启动 node 服务之后启动 Browersync 任务，监听相关文件

#### 调试

##### Chrome DevTools

1. 使用命令行
   `node --inspect-brk YOUR_FILE_PATH.js`
2. 浏览器 inspect 界面
   使用 Chrome 打开地址 chrome://inspect ，点击 Remote Target 中调试的文件名 "inspect" 按钮
3. 进入 Chrome 调试界面

##### VS Code

1. 点击调试按钮
2. 创建 launch.json

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": ["<node_internals>/**"],
            "program": "${file}"
        }
    ]
}
```

一般需要修改的就是 program ，通过 program 指定调试文件
`${file}` 调试当前文件
`${workspaceFolder}\\index.js` 调试项目目录的 `index.js` 入口文件

3. 点击 “Launch Program”

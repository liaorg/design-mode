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
                // browser: "chrome",
            },
            () => {
                console.log("browser refreshed.");
            },
        );
    });
}
exports.default = series(server);
// gulp.task("browser-sync", () => {
//     const nodemon = require("gulp-nodemon");
//     nodemon({
//         script: "app.js",
//         // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
//         ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"],
//         env: {
//             NODE_ENV: "development",
//         },
//     }).on("start", () => {
//         // 启动Browsersync服务
//         // Browsersync会用http://localhost:8080来代理nodemon启动的主机地址
//         browserSync.init(
//             {
//                 files: ["app.js", "public/**/*.*", "views/**", "routes/**"],
//                 proxy: "http://localhost:8081",
//                 port: 8000,
//                 // browser: ["chrome"],
//             },
//             () => {
//                 console.log("browser refreshed.");
//             },
//         );
//     });
// });
// gulp.task("default", ["browser-sync"], () => {
//     reload();
// });
/**
// 结合gulp使用Browsersync
// https://browsersync.io/docs/gulp/
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
*/

### nojs 中文网[http://nodejs.cn/api]

### 一、以 bash 脚本的方式运行

使用 "shebang" 方式，"shebang" 是文件的第一行，它告诉操作系统使用哪个解释器来运行脚本
在文件第一行 `#!/usr/bin/env node`，并设置 chmod u+x app.js 文件为可执行

### 二、如何退出 nodejs

1. 当在控制台中运行程序时，可以用 `ctrl-C` 关闭它
2. 以编程方式退出 `process.exit()`
3. 发送 SIGTERM 信号
4. 查看所有进程 ps -ef | grep node| wc -l

注意：process 不需要 "require"，它是自动可用的

```js
process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated");
    });
});
// 发送停止信号
process.kill(process.pid, "SIGTERM");
```

### 三、读取环境变量

```js
process.env.NODE_ENV; // "development"
```

### 四、从命令行接收参数

1. 参数可以是独立的，也可以具有键和值

```sh
node app.js joe
node app.js name=joe
```

2. 通过 `process.argv` 获取参数
   第一个参数是 node 命令的完整路径
   第二个参数是正被执行的文件的完整路径
   所有其他的参数从第三个位置开始

```js
// 获取参数
const args = process.argv.slice(2);
// node app.js joe
args[0]; //joe
// node app.js name=joe
// args[0] 为 name=joe
// 使用 minimist 库，但是需要在每个参数名称之前使用双破折号
// node app.js --name=joe
const args = require("minimist")(process.argv.slice(2));
args["name"]; //joe
```

### 五、输出到命令行

stdout 标准输出 和 stderr 标准错误流
console.log 为标准输出
console.error 会打印到 stderr 流

```js
console.log();
console.clear(); // 清空控制台
console.count(); // 元素计数 count 方法会对打印的字符串的次数进行计数，并在其旁边打印计数
console.trace(); // 打印堆栈踪迹
// 使用 time() 和 timeEnd() 计算耗时
```

### 六、为输出着色

可以使用转义序列[https://gist.github.com/iamnewton/8754917]在控制台中为文本的输出着色。 转义序列是一组标识颜色的字符。
`console.log('\x1b[33m%s\x1b[0m', '你好')`
可以使用 Chalk[https://github.com/chalk/chalk] 库 `npm install chalk`

```js
const chalk = require("chalk");
console.log(chalk.yellow("你好"));
```

### 七、创建进度条

使用 Progress[https://www.npmjs.com/package/progress] 包 `npm install progress`

```js
const ProgressBar = require("progress");
// 创建一个 10 步的进度条，每 100 毫秒完成一步
const bar = new ProgressBar(":bar", { total: 10 });
const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    }
}, 100);
```

### 八、从命令行接收输入

使用 readline 模块来接收输入流

```js
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`你叫什么名字?`, (name) => {
    console.log(`你好 ${name}!`);
    readline.close();
});
```

Inquirer.js[https://github.com/SBoudrias/Inquirer.js] 软件包则提供了更完整、更抽象的解决方案
例如询问多项选择、展示单选按钮、确认等
`npm install inquirer`

```js
const inquirer = require("inquirer");
var questions = [
    {
        type: "input",
        name: "name",
        message: "你叫什么名字?",
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log(`你好 ${answers["name"]}!`);
});
```

### 九、使用 exports 从 Node.js 文件中公开功能

1. 当想要导入某些东西时，使用

```ts
// const library = require("./library");
import * as library from "./library";
```

2. 导出为模块

```js
// 将对象赋值给 module.exports
// 公开了它指向的对象
const car = {
    brand: "Ford",
    model: "Fiesta",
};
module.exports = car;
//在另一个文件中
const car = require("./car");
```

```js
// 将要导出的对象添加为 exports 的属性
// 公开了它指向的对象的属性
const car = {
    brand: "Ford",
    model: "Fiesta",
};
module.exports.car = car;
//在另一个文件中
const items = require("./items");
items.car;
```

```ts
// export default{}
const car = {
    brand: "Ford",
    model: "Fiesta",
};
export default { car };
//在另一个文件中
// import car form './car';
// 或者
// export { car };
// import { car } form './car';
```

### 十、package.json 文件说明

version 表明了当前的版本。
name 设置了应用程序/软件包的名称。
description 是应用程序/软件包的简短描述。
main 设置了应用程序的入口点。
private 如果设置为 true，则可以防止应用程序/软件包被意外地发布到 npm。
scripts 定义了一组可以运行的 node 脚本。
dependencies 设置了作为依赖安装的 npm 软件包的列表。 --save
devDependencies 设置了作为开发依赖安装的 npm 软件包的列表。 --save-dev
engines 设置了此软件包/应用程序在哪个版本的 Node.js 上运行。
browserslist 用于告知要支持哪些浏览器（及其版本）。
license 指定软件包的许可证。

当使用`npm install`时会安装`package-lock.json`文件中固定的版本
npm 的语义版本控制：包含 3 个数字：x.y.z。
第一个数字是主版本。
第二个数字是次版本。^
第三个数字是补丁版本。~
npm 提供了快捷升级命令
● 升级主版本号：`npm version major`
● 升级次版本号：`npm version minor`
● 升级修订版本号：`npm version patch`

```sh
# 安装软件包 -S[--save] 为软件依赖 -D[--save-dev] 为开发依赖 --production 表示生产环境
npm install <package-name>
# 更新次版本或补丁版本
npm update
# 发现软件包的最新版本
npm outdated
# 若要将所有软件包更新到新的主版本，则全局地安装 npm-check-updates
npm install -g npm-check-updates
# 然后运行以下命令
ncu -u
npm update
# 卸载 npm 软件包
npm uninstall <package-name>
# 如果使用 -S 或 --save 标志，则此操作还会移除 package.json 文件中的引用
# 如果程序包是开发依赖项（列出在 package.json 文件的 devDependencies 中），则必须使用 -D 或 --save-dev 标志从文件中移除：
npm uninstall -S <package-name>
npm uninstall -D <package-name>
# 移除全局包
npm uninstall -g <package-name>
```

### 十一、模块

1. 默认为 commonjs 模块`"type":"commonjs"`
2. ⽤后缀`.mjs`的⽂件名表⽰这个⽂件为 ES6 模快⽂件，可以在文件中使用`import/export`指令
3. 通过修改`package.json`中的`type`属性为`module`来使`.js`文件默认支持 ES6 模块
4. 配置`"type":"module"`后如果要使用 CJS(`module.exports/require()`) 模块，文件后缀要为`.cjs`
5. ESM 是编译时加载（静态加载），有⼀个独⽴的模块依赖的解析阶段，模块输出的是接⼝（引⽤），它的加载、解析、执⾏都是异步的
6. CJS 是运⾏时加载（动态加载），模块输出的是值（模块对象），值会被缓存，它的加载、解析、执⾏都是同步的（require()为⼀个同步⽅法）
7. CJS 模块加载 ES6 模块，require() 不能加载 es6 模块，只能用 import 加载

```js
// import() 返回一个 promise
import('../foo.js').then(res =>{});
(async()=>{
await import('../foo.js');
}());
```

8. ES6 模块加载 CJS 模块，只能整体加载

```js
import m from "./foo.cjs";
const { a } = m;
```

9. CJS 转 ESM

```js
// 从 cjs 导入
import m from "./foo.cjs";
// 提取重要部分导出
export const bar = m.bar;
```

10. ESM 转 CJS

```js
// 从 esm 导入
let m = null;
(async()=>{
await import('../foo.js');
}());
// 导出
module.exports = { m }
```

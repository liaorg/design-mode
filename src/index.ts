// node: URL 作为加载 Node.js 内置模块的替代方法
import readline from "node:readline";
// npx ts-node src/index.ts
// console.count 元素计数 count 方法会对打印的字符串的次数进行计数，并在其旁边打印计数
const x = 1;
const y = 2;
// const z = 3;
console.count("x 的值为 " + x + " 且已经检查了几次？");
console.count("x 的值为 " + x + " 且已经检查了几次？");
console.count("y 的值为 " + y + " 且已经检查了几次？");

// 打印堆栈踪迹
const function2 = () => console.trace();
const function1 = () => function2();
function1();

// 使用 time() 和 timeEnd() 计算耗时
const doSomething = () => console.log("测试");
const measureDoingSomething = () => {
    console.time("doSomething()");
    // 做点事，并测量所需的时间。
    doSomething();
    console.timeEnd("doSomething()");
};
measureDoingSomething();
// 为输出着色
console.log("\x1b[33m%s\x1b[0m", "你好");

// 接收输入流
const readlineHandel = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readlineHandel.question(`你叫什么名字?`, (name) => {
    console.log(`你好 ${name}!`);
    readlineHandel.close();
});

## 关键概念

### 一、事件循环

https://blog.csdn.net/cc18868876837/article/details/97107219
Node.js 是什么[https://www.yuque.com/sunluyong/node/what-is-node]
深入理解 JavaScript Event Loop[https://zhuanlan.zhihu.com/p/34229323]

1. 调用堆栈是一个 LIFO 队列（后进先出）
    > - 事件循环不断地检查调用堆栈，以查看是否需要运行任何函数。
    > - 当执行时，它会将找到的所有函数调用添加到调用堆栈中，并按顺序执行每个函数。
2. 任务队列(宏队列)
    > - 当调用 setTimeout() 时，浏览器或 Node.js 会启动定时器。 当定时器到期时，则回调函数会被放入“任务队列”中
    > - 任务队列中的代码会在所有调用堆栈中的代码执行完后才开始执行
    > - 任务：script DOM 事件、Ajax 事件、setTimeout、setImmediate、setInterval 事件 UI rendering/UI 事件、postMessage、MessageChannel、I/O 等
3. es6 微任务队列
    > - 一个事件循环中只有一个微任务队列
    > - promise 或 async/await 创建的事件
    > - 它会在同步代码之后，setTimeout 之前执行
    > - 微任务：Promise、nextTick、Proxy、MutaionObserver
4. process.nextTick()
    > - 当将一个函数传给 process.nextTick() 时，则指示引擎在当前操作结束（在下一个事件循环开始之前）时调用此函数
    > - 传给 process.nextTick() 的函数会在事件循环的当前迭代中（当前操作结束之后）被执行
    > - 它会始终在 setTimeout 和 setImmediate 之前执行
5. setImmediate()

    > - 相当于使用 setTimeout(() => {}, 0)，执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行

6. JavaScript Runtime 的运行机制
    > 1. 主线程(不断循环) =>
    > 2. 对同步任务，创建执行上下文，按顺序进入执行栈
    > 3. 对于异步任务：
    >     > 1. 与步骤 2 相同，同步执行这段代码
    >     > 2. 遇到任务（task）放到任务队列（task queue）
    >     > 3. 遇到微任务（microtask）放到微任务队列（microtask queue）
    >     > 4. 由其他线程来执行具体的异步操作
    > 4. 主线程执行完毕 => 读取任务队列
    > 5. 执行微任务队列（microtask queue），微任务队列（microtask queue）执行完毕 =>
    > 6. 执行一次任务队列（task queue）中的一个任务(遇到微任务时添加到微任务队列)，执行完毕(检查微任务队列) =>
    > 7. 执行微任务队列（microtask queue），执行完毕 =>
    > 8. 当前任务执行完毕，开始检查渲染，然后 GUI 线程接管渲染
    > 9. 依次循环 5 6 7 8 (事件循环的执行顺序)

### 二、回调

1. 为一个事件添加监听事件，这个监听事件就是回调

```js
// dom 中
// addEventListener('click') attachEvent('onclick')
document.getElementById("button").addEventListener("click", (err, data) => {
    //被点击
});
// nodejs 中 events 模块
// on() 用于添加事件监听，emit() 用于触发事件
// const EventEmitter = require("events");
import EventEmitter from "node:events";
const eventEmitter = new EventEmitter();
// addListener() 别名为 on()
eventEmitter.on("start", () => {
    console.log("开始");
});
eventEmitter.emit("start");
// once(): 添加单次监听器
// removeListener() / off(): 从事件中移除事件监听器
// removeAllListeners(): 移除事件的所有监听器
```

2. 任何回调函数中的第一个参数为错误对象（即错误优先的回调）

```js
fs.readFile("/文件.json", (err, data) => {
    if (err !== null) {
        //处理错误
        console.log(err);
        return;
    }

    //没有错误，则处理数据。
    console.log(data);
});
```

3. 回调的替代方案：promise 或 async/await

### 三、promise 及 async/await

```js
let done = true;

const isItDoneYet = new Promise((resolve, reject) => {
    if (done) {
        const workDone = "这是创建的东西";
        resolve(workDone);
    } else {
        const why = "仍然在处理其他事情";
        reject(why);
    }
});
// promise 版本
const checkIfItsDone = () => {
    isItDoneYet
        .then((ok) => {
            console.log(ok);
        })
        .catch((err) => {
            console.error(err);
        });
};
// async await 版本
const doSomething = async () => {
    await isItDoneYet();
};
```

1. Promise.all()，所有回调都执行完之后

```js
const f1 = fetch("/something.json");
const f2 = fetch("/something2.json");
Promise.all([f1, f2])
    .then(([res1, res2]) => {
        console.log("结果", res1, res2);
    })
    .catch((err) => {
        console.error(err);
    });
```

2. Promise.race()，以最先完成的回调为准

```js
const first = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "第一个");
});
const second = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "第二个");
});

Promise.race([first, second]).then((result) => {
    console.log(result); // 第二个
});
```

3. 在任何函数之前加上 async 关键字意味着该函数会返回 promise，即使没有显式地这样做，它也会在内部使它返回 promise

```js
const aFunction = async () => {
    return "测试";
};
// aFunction 与 aFunction1 一样
const aFunction1 = () => {
    return Promise.resolve("测试");
};

aFunction().then(alert); // 这会 alert '测试'
```

```js
// promise 版本
const getFirstUserData = () => {
    return fetch("/users.json") // 获取用户列表
        .then((response) => response.json()) // 解析 JSON
        .then((users) => users[0]) // 选择第一个用户
        .then((user) => fetch(`/users/${user.name}`)) // 获取用户数据
        .then((userResponse) => userResponse.json()); // 解析 JSON
};

getFirstUserData();
// async/await 版本
const getFirstUserData1 = async () => {
    const usersInfo = await fetch("/user.json"); // 获取用户列表
    const users = await usersInfo.json(); // 解析 JSON
    const user = users[0]; // 选择第一个用户
    const userInfo = await fetch(`/user/${user.name}`); // 获取用户数据
    const userData = await userInfo.json(); // 解析 JSON
};
```

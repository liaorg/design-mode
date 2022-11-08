// 类适配器
// 目标对象
interface Target {
    request(): void;
}

// 被适配者
class Adaptee {
    constructor() {}
    // 这是源角色，有自己的的业务逻辑
    specificRequest() {}
}

// 适配器
export class Adapter extends Adaptee implements Target {
    constructor() {
        super();
    }
    request(): void {
        return super.specificRequest();
    }
}

// 使用
const target: Target = new Adapter();
const res = target.request();
console.log("res", res);

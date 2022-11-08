// 对象适配器 推荐
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
export class Adapter implements Target {
    private adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }
    request(): void {
        return this.adaptee.specificRequest();
    }
}

// 使用
const adaptee: Adaptee = new Adaptee();
const target: Target = new Adapter(adaptee);
const res = target.request();

console.log("res", res);

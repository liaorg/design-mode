// 接口适配器
// 被适配者
interface Adaptee {
    operation1(): void;
    operation2(): void;
}

// 抽象要实现的接口
abstract class Adapter implements Adaptee {
    operation1(): void {}
    operation2(): void {}
}

// 重写抽象的方法，不需要的不要重写
export class UseClass extends Adapter {
    // 重写需要的，不需要的不重写
    operation1(): void {}
}

// 使用
const target: Adaptee = new UseClass();
const res = target.operation1();
console.log("res", res);

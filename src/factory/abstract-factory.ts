// 产品A接口
interface AbstractProductA {}
// 产品B接口
interface AbstractProductB {}

// 具体的产品类A 1
class ConcreteProductA1 implements AbstractProductA {
    constructor() {}
}
// 具体的产品类A 2
class ConcreteProductA2 implements AbstractProductA {
    constructor() {}
}
// 具体的产品类B 1
class ConcreteProductB1 implements AbstractProductB {
    constructor() {}
}
// 具体的产品类B 2
class ConcreteProductB2 implements AbstractProductB {
    constructor() {}
}
// 具体的产品类 n...

// 抽象工厂
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

// 具体工厂1
export class ConcreteFactory1 implements AbstractFactory {
    constructor() {}
    createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }
    createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}
// 具体工厂2
export class ConcreteFactory2 implements AbstractFactory {
    constructor() {}
    createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }
    createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

// 使用
const factory1: AbstractFactory = new ConcreteFactory1();
const productA1: AbstractProductA = factory1.createProductA();
const productA2: AbstractProductA = factory1.createProductA();

const factory2: AbstractFactory = new ConcreteFactory2();
const productB1: AbstractProductB = factory2.createProductB();
const productB2: AbstractProductB = factory2.createProductB();

console.log("product", productA1, productA2, productB1, productB2);

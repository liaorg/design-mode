// 产品接口
interface Product {}

// 具体的产品类 1
class ConcreteProduct implements Product {
    constructor() {}
}
// 具体的产品类 2
class ConcreteProduct2 implements Product {
    constructor() {}
}
// 具体的产品类 n...

// 抽象工厂
abstract class AbstractFactory {
    abstract createProduct(type: string): Product;
}

// 具体工厂 1
export class ConcreteFactory1 extends AbstractFactory {
    constructor() {
        super();
    }
    createProduct(type: string): Product {
        if (type === "p1") {
            return new ConcreteProduct();
        } else if (type === "p2") {
            return new ConcreteProduct2();
        }
        // .... n个具体产品的创建
        return new ConcreteProduct();
    }
}
// 具体工厂 n....

// 使用
const factory: AbstractFactory = new ConcreteFactory1();
const product: Product = factory.createProduct("p1");

console.log("product", product);

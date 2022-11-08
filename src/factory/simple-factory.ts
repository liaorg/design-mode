// 产品接口
interface Product {}

// 具体的产品类 1
class ConcreteProduct implements Product {
    constructor() {}
}
// 具体的产品类 2
class ConcreteProductTwo implements Product {
    constructor() {}
}
// 具体的产品类 n...

// 简单工厂
export class SimpleFactory {
    static createProduct(type: string): Product {
        if (type === "productOne") {
            return new ConcreteProduct();
        } else if (type === "p2") {
            return new ConcreteProductTwo();
        }
        // .... n个具体产品的创建
        return new ConcreteProduct();
    }
}

// 使用
const product = SimpleFactory.createProduct("productOne");
console.log("product", product);

// 饿汉式（静态变量）
export class SingletonLow {
    // 1. 本类内部创建对象实例化
    static instance: SingletonLow = new SingletonLow();
    // 2. 构造器私有化，外部不能 new
    private constructor() {}
    // 3. 提供一个公有的静态方法，返回实例对象
    public static getInstance(): SingletonLow {
        return this.instance;
    }
}

// 推荐： 懒汉式（线程不安全），js 是基于单线程所以不存在线程不安全
export class Singleton {
    // 1. 定义一个私有的静态变量
    private static instance: Singleton = null;
    // 2. 构造器私有化，外部不能 new
    private constructor() {}
    // 3. 提供一个公有的静态方法，返回实例对象
    public static getInstance(): Singleton {
        if (this.instance === null) {
            return new Singleton();
        }
        return this.instance;
    }
}

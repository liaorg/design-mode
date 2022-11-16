"use strict";
exports.__esModule = true;
exports.getSingleon = exports.Singleton = exports.SingletonLow = void 0;
// 饿汉式（静态变量）
var SingletonLow = /** @class */ (function () {
    // 2. 构造器私有化，外部不能 new
    function SingletonLow() {}
    // 3. 提供一个公有的静态方法，返回实例对象
    SingletonLow.getInstance = function () {
        return this.instance;
    };
    // 1. 本类内部创建对象实例化
    SingletonLow.instance = new SingletonLow();
    return SingletonLow;
})();
exports.SingletonLow = SingletonLow;
// 推荐： 懒汉式（线程不安全），js 是基于单线程所以不存在线程不安全
var Singleton = /** @class */ (function () {
    // 2. 构造器私有化，外部不能 new
    function Singleton() {}
    // 3. 提供一个公有的静态方法，返回实例对象
    Singleton.getInstance = function () {
        if (this.instance === null) {
            return new Singleton();
        }
        return this.instance;
    };
    // 1. 定义一个私有的静态变量
    Singleton.instance = null;
    return Singleton;
})();
exports.Singleton = Singleton;
var SingletonOne = /** @class */ (function () {
    function SingletonOne() {}
    return SingletonOne;
})();
// 导出一个可以缓存结果的函数以生成单例
exports.getSingleton = (function () {
    var instance;
    return function () {
        if (!instance) {
            instance = new SingletonOne();
        }
        return instance;
    };
})();

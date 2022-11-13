// 抽象迭代器
interface Iterator<T> {
    list: any[];
    index: number;
    next(): T;
    hasNext(): boolean;
}

// 数据聚集
interface Container {
    list: any[];
    getIterator(): Iterator<any>;
}

export class ConcreteIterator implements Iterator<any> {
    list: any[];
    index: number = 0;
    constructor(Container: Container) {
        this.list = Container.list;
    }
    // 返回当前下标元素的值
    next() {
        if (this.hasNext()) {
            // 返回当前下标元素的值 并且 累加 index
            return this.list[this.index++];
        }
        return null;
    }
    // 判断当前元素的下一个元素是否有值
    hasNext(): boolean {
        if (this.index >= this.list.length) {
            return false;
        }
        return true;
    }
}

export class ConcreteContainer implements Container {
    list: any[];
    constructor(list: any[]) {
        this.list = list;
    }
    getIterator(): Iterator<any> {
        return new ConcreteIterator(this);
    }
}

// 使用
const c = new ConcreteContainer([1, 2, 3, 4]);
const it = c.getIterator();
while (it.hasNext()) {
    console.log(it.next());
}

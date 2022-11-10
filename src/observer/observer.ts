// 观察者，等待被触发
interface ObserverInterface {
    update(msg: string): void;
}

// 主题，接收状态变化，触发每个观察者
interface SubjectInterface {
    observers: ObserverInterface[];
    addObserver(observer: ObserverInterface): void;
    removeObserver(observer: ObserverInterface): void;
    notifyObservers(msg: string): void;
}

// 主题，接收状态变化，触发每个观察者
class ConcreteSubject implements SubjectInterface {
    observers: ObserverInterface[] = [];
    state: object = {};
    addObserver(observer: ObserverInterface): void {
        this.observers.push(observer);
    }
    removeObserver(observer: ObserverInterface): void {
        const index = this.observers.findIndex((val) => val === observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers(msg: string): void {
        this.observers.forEach((observer) => observer.update(msg));
    }
    change(name: string, value: string): void {
        this.state[name] = value;
        console.log(`${name}状态更新为：${value}`);
        console.log("通知所有观察者");
        this.notifyObservers("状态更新");
    }
}

// 观察者，等待被触发
class ConcreteObserver implements ObserverInterface {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    update(msg: string): void {
        console.log(`${this.name} update ${msg}`);
    }
}

// 使用
const subject = new ConcreteSubject();
const ob1 = new ConcreteObserver("ob1");
const ob2 = new ConcreteObserver("ob2");
subject.addObserver(ob1);
subject.addObserver(ob2);

subject.change("天气", "多云");

subject.removeObserver(ob2);
subject.change("天气", "晴");

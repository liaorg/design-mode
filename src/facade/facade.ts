class SubSystemA {
    constructor() {}
    action(): void {
        console.log("SubSystemA");
    }
}
class SubSystemB {
    constructor() {}
    action2(): void {
        console.log("SubSystemB");
    }
}

class SystemFacade {
    a: SubSystemA;
    b: SubSystemB;
    constructor() {
        this.a = new SubSystemA();
        this.b = new SubSystemB();
    }
    actionA() {
        this.a.action();
    }
    actionB() {
        this.b.action2();
    }
}

// 使用
const client = new SystemFacade();
client.actionA();
client.actionB();

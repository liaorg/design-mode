interface Image {
    display(): void;
}
// 真实对象
class RealImage implements Image {
    fileName: string;
    constructor(fileName: string) {
        this.fileName = fileName;
    }
    display(): void {
        console.log("RealImage", this.fileName);
    }
}

// 代理对象
class ImageProxy implements Image {
    fileName: string;
    realImage: RealImage;
    constructor(fileName: string, realImage: RealImage) {
        this.fileName = fileName;
        this.realImage = realImage;
    }
    display(): void {
        console.log("ProxyImage");
        this.realImage.display();
    }
}

// 使用
const img = new RealImage("real");
const proxyImg = new ImageProxy("real", img);
proxyImg.display();

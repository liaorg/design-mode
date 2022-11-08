import { Car } from "./car";

export class VipCar extends Car {
    price: number;
    constructor(name: string, number: number) {
        super(name, number);
        this.price = 2;
    }
}

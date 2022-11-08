import { Car } from "./car";

export class QuickCar extends Car {
    price: number;
    constructor(name: string, number: number) {
        super(name, number);
        this.price = 1;
    }
}

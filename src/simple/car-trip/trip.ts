export interface CarInterface {
    name: string;
    number: number;
    price?: number;
}

export class Trip {
    car: CarInterface;
    constructor(car: CarInterface) {
        this.car = car;
    }

    public start() {
        return `car info: Name is ${this.car.name}, Num is ${this.car.number}`;
    }

    public end(trip: number) {
        // return `trip bill: ${this.car.price * trip}`;
        return `trip bill: ${this.car.price * trip}`;
    }
}

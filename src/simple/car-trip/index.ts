import { QuickCar } from "./quick-car";
import { Trip } from "./trip";
import { VipCar } from "./vip-car";

// 获取打车金额
export const carBill = () => {
    console.log("carBill");

    const bill = { quickCar: { start: "", bill: "" }, vipCar: { start: "", bill: "" } };
    const trip = 5;
    // 快车
    const quickCar = new QuickCar("kc", 100);
    const quickCarTrip = new Trip(quickCar);
    bill.quickCar.start = quickCarTrip.start();
    bill.quickCar.bill = quickCarTrip.end(trip);
    // 专车
    const vipCar = new VipCar("vipcar", 500);
    const vipCarTrip = new Trip(vipCar);
    bill.vipCar.start = vipCarTrip.start();
    bill.vipCar.bill = vipCarTrip.end(trip);
    return bill;
};

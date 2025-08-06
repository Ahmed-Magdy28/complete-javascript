'use strict';



class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = Number.parseInt(speed);
    };
    accelerate() {
        this.speed += 10
        console.log(`${this.make} going at ${this.speed} km/h`)
    };
    brake() {
        this.speed -= 5
        console.log(`after brakes: ${this.speed} km/h`)
    };
    get speedUS() {
        return this.speed / 1.6
    }
    set speedUS(speed) {
        console.log('setter worked')
        this.speed = speed * 1.6
    }


};

class EV extends Car {
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }
    chargeBattery(chargeTo) {
        this.charge = chargeTo;
        return this;
    }
    accelerate() {
        this.speed += 20;
        this.charge--;
        console.log(`'${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`)
        return this;
    }
    brake() {
        super.brake();
        return this;
    }
}
const car1 = new EV('Rivian', 120, 23);
console.log(car1)
car1.chargeBattery(50).accelerate().accelerate().chargeBattery(70).accelerate().brake();
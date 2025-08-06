'use strict';


const Car = function (make, speed) {
    this.make = make;
    this.speed = Number.parseInt(speed); 

};

Car.prototype.accelerate = function (){
    this.speed += 10
    console.log(`after accerleration: ${this.speed} km/h`)
}
Car.prototype.brake = function () {
    this.speed -= 5
    console.log(`after brakes: ${this.speed} km/h`)
}

const EV = function(make,speed,charge){
    Car.call(this, make, speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
this.charge = chargeTo;
}
EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`'${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`)  
}

const car1 = new EV('Tesla', 120,23);
car1.chargeBattery(99);
car1.accelerate();
car1.accelerate();
car1.brake();
'use strict';


const Car = function (brand, speed) {
    this.brand = brand;
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

const ahmedCar = new Car('BMW', '120 km/h')
const jonasCar = new Car('Mercedes', '95 km/h')

ahmedCar.accelerate();
ahmedCar.accelerate();
ahmedCar.accelerate();
ahmedCar.brake();
jonasCar.brake();
jonasCar.brake();
jonasCar.brake();
jonasCar.accelerate();
jonasCar.accelerate();

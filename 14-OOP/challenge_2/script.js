class Car {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = Number.parseInt(speed);
    };
    accelerate() {
        this.speed += 10
        console.log(`after accerleration: ${this.speed} km/h`)
    };
    brake() {
        this.speed -= 5
        console.log(`after brakes: ${this.speed} km/h`)
    };
    get speedUS(){
        return this.speed / 1.6
    }
    set speedUS(speed){
        console.log('setter worked')
        this.speed = speed * 1.6
    }


};
const ahmedCar = new Car('Ford', '120 km/h')

ahmedCar.accelerate();
ahmedCar.accelerate();
ahmedCar.accelerate();
ahmedCar.brake(); 
ahmedCar.brake(); 
console.log(`speedin US: ${ahmedCar.speedUS} mil/h`);
console.log(`speedin US: ${ahmedCar.speedUS} mil/h`);
ahmedCar.speedUS = 50;
console.log(ahmedCar);



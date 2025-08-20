// Importing module
import  {addToCart} from './shoppingCart.js';
console.log("Importing module");

addToCart('bread', 5);

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        console.log(`${this.name} is ${this.age} years old`);
    }
}

const jonas = new Person('Jonas', 25);
console.log(jonas);

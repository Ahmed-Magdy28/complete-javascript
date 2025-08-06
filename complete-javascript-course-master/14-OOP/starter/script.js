'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear
    // console.log(`Hello ${this.firstName} you  have ${this.birthYear}`)
    // this.calcAge = function(){
    //     console.log(new Date().getFullYear() - this.birthYear)
    // }
}
const ahmed = new Person('ahmed', 1999);
console.log(ahmed);
console.log(ahmed instanceof Person);

Person.prototype.calcAge = function () {
    console.log(new Date().getFullYear() - this.birthYear)
}
console.log(Person.prototype)
ahmed.calcAge();
'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear
    // console.log(`Hello ${this.firstName} you  have ${this.birthYear}`)
    // this.calcAge = function(){
    //     console.log(new Date().getFullYear() - this.birthYear)
    // }
};
// const ahmed = new Person('ahmed', 1999);
// console.log(ahmed);
// console.log(ahmed instanceof Person);

Person.prototype.calcAge = function () {
    console.log(new Date().getFullYear() - this.birthYear)
}
// console.log(Person.prototype)
// ahmed.calcAge();

// class PersonCl {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     };
//     calcAge() {
//         console.log(new Date().getFullYear() - this.birthYear)
//     };

//     get age() {
//         return new Date().getFullYear() - this.birthYear
//     }

//     get fullName() {
//         return this._fullName;
//     }
//     set fullName(name) {
//         if(name.includes(' ')) this._fullName = name;
//         else alert(`${name} not full name`)
//     }
//     static hey(){
//         console.log('hey there ')
//     }
// }


// const marwa = new Person('marwa tareq', 2002);
// console.log(marwa);
// marwa.calcAge();
// console.log(marwa.age);


// const Student = function (firstName,birthYear,course){
//     Person.call(this, firstName, birthYear);
//     this.course = course;
// }

// Student.prototype = Object.create(Person.prototype)

// Student.prototype.introduce = function () {
//     console.log(`My name is ${this.firstName} and I study ${this.course}`)
// }

// const mike = new Student('mike', 1995, 'ComputerScience');
// console.log(Student.prototype.constructor)
// Student.prototype.constructor = Student;
// console.log(Student.prototype.constructor)
// console.log(mike)
// mike.calcAge();





class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    };
    calcAge() {
        console.log(new Date().getFullYear() - this.birthYear)
    };

    get age() {
        return new Date().getFullYear() - this.birthYear
    }

    get fullName() {
        return this._fullName;
    }
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} not full name`)
    }
    static hey() {
        console.log('hey there ')
    }
}

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course) {
        super(fullName,birthYear);
        this.course = course;
    }
    introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)}
}

const martha = new StudentCl('martha el sayed', 1996, 'Digital Marketing');

console.log(martha);
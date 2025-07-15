#!/usr/bin/env node
'use strict';

console.log(Date.now())
const ahmed = {
    firstName: "ahmed",
    lastName: "Magdy",
    yearOfBorn: 1999,
    get age() {return new Date().getFullYear() - this.yearOfBorn;},
    freinds: ['7amedo', 'ramzy','youssef', 'metwali']
};
console.log(ahmed.ymat);




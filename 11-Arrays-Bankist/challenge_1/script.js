'use strict';


const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
const checkDogs = function (dogsJulia, dogsKate) {
    const juliaDogs = [...dogsJulia.slice(1, -2)];
    const dogs = [...juliaDogs, ...dogsKate];
    dogs.forEach(function (element, i) {
        const dog = element >= 3 ? 
        `Dog number ${i+1} is an adult , and is ${element} years old` : 
        `Dog number ${i+1} is still a puppy 🐶`;
        console.log(dog)
    })
}
checkDogs(dogsJulia, dogsKate);
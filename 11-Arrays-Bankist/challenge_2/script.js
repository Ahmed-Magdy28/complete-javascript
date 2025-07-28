'use strict';


const dogsJulia = [5, 2, 4, 1, 15, 8, 3];
const dogsKate = [16, 6, 10, 5, 6, 1, 4];
const checkDogs = function (dogsJulia, dogsKate) {
    const juliaDogs = [...dogsJulia.slice(1, -2)];
    const dogs = [...juliaDogs, ...dogsKate];
    dogs.forEach(function (element, i) {
        const dog = element >= 3 ?
            `Dog number ${i + 1} is an adult , and is ${element} years old` :
            `Dog number ${i + 1} is still a puppy 🐶`;
        console.log(dog)
    })
}

const calcAverageHumanAge = (dogsAges) => dogsAges.map((age) => age <= 2 ? 2 * age : 16 + age * 4)

const calcAfterExculde = (dogsAges) => dogsAges.filter(age => age > 18);

const calcAverage = (dogsAges) => dogsAges.reduce((acc, cur) => acc + cur,0) / dogsAges.length


console.log('---------Julia Dogs--------------')
console.log(calcAverageHumanAge(dogsJulia))
console.log('------------------------------')
console.log(calcAfterExculde(calcAverageHumanAge(dogsJulia)))
console.log('------------------------------')
console.log(calcAverage(calcAfterExculde(calcAverageHumanAge(dogsJulia))))
console.log('------------------------------')
console.log('------------Kate Dogs-----------')
console.log('------------------------------')
console.log(calcAverageHumanAge(dogsKate))
console.log('------------------------------')
console.log(calcAfterExculde(calcAverageHumanAge(dogsKate)))
console.log('------------------------------')
console.log(calcAverage(calcAfterExculde(calcAverageHumanAge(dogsKate))))
console.log('------------------------------')
'use strict';
let str1 = 'underscore_case'
let str2 = ' first_name'
let str3 = 'Some_Variable'
let str4 = '  calculate_AGE'
let str5 = 'delayed_departure'

const data = `${str1}\n${str2}\n${str3}\n${str4}\n${str5}`
function CasingCorrection(data) {
    const array = data.split(/\r?\n/);
    const newArray = [];

    for (let element of array) {
        element = element.trim();
        const underscoreIndex = element.indexOf('_');

        if (underscoreIndex !== -1) {
            // Lowercase the first letter
            element = element[0].toLowerCase() + element.slice(1);

            // Uppercase the character after the underscore
            const charToUpper = element[underscoreIndex + 1].toUpperCase();

            // Reconstruct the string without the underscore
            element = element.slice(0, underscoreIndex) + charToUpper + element.slice(underscoreIndex + 2);
        } else {
            // Lowercase the first letter if no underscore
            element = element[0].toLowerCase() + element.slice(1);
        }

        newArray.push(element);
    }

    return newArray;
}

console.log(CasingCorrection(data).join('\n'));
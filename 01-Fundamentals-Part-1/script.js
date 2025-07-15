#!/usr/bin/env node



const bill = 350;

/* Write your code below. Good luck! 🙂 */

let tip = bill >= 300 ? bill *.2 : bill *.15
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${tip + bill}`)
console.log(`if 15% ${bill *.15} and if 20% ${bill *.2}`)
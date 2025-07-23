'use strict';

const btn = document.querySelector('.poll');
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),
    // This generates [0, 0, 0, 0]. More in the next section!
}


poll.displayResults = function (type) {
    if (type === 'array' || type === undefined) {
        console.log(this.answers)
    }
    else {
        console.log(`Poll results are ${this.answers.join(' ')}`)
    }
}

poll.registerNewAnswer = function () {
    let answer = prompt(`${this.question}\n${this.options.join('\n')}\n`,);
    while (true) {
        if (answer === null) {
            break;
        }
        answer = Number(answer);
        if (Number.isInteger(answer) && answer >= 0 && answer <= this.options.length - 1) {
            this.answers[answer]++;
            this.displayResults();
            this.displayResults("string");
            break;
        }
        else {
            alert('Invalid input, please try again.')
            answer = prompt(`${this.question}\n${this.options.join('\n')}\n`,);
        }
    }
}
const register = poll.registerNewAnswer.bind(poll);
poll.displayResults.call({answers: [5, 2, 3] }, 'string');
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1] }, 'string');
btn.addEventListener('click', register)
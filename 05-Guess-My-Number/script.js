'use strict';


const message = document.querySelector('.message');
let randomNumber = generateRandomNumber();
const guess = document.querySelector('.guess');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const body = document.querySelector('body');
const highscore = document.querySelector('.highscore');
const check = document.querySelector('.check');
const againButton = document.querySelector('.again');
let gameActive = true;


function generateRandomNumber() {
    return Math.trunc(Math.random() * 20) + 1;
}

function again() {
    randomNumber = generateRandomNumber();
    number.textContent = '?';
    score.textContent = 20;
    guess.value = '';
    displayMessage('Start guessing...');
    body.style.backgroundColor = COLORS.default;
    number.style.width = '15rem';
    gameActive = true;


}

const COLORS = {
  max: '#AC3E13',
  min: '#9A8332',
  win: '#54951F',
  lose: '#A91B1B',
  default: '#222',
};

function CheckHighScores() {
    if (Number(score.textContent) > Number(highscore.textContent)) {
        highscore.textContent = Number(score.textContent);
    }
}

function displayMessage(Text) {
    message.textContent = Text;
}

function guessGame() {
    const inputedNumber = Number(guess.value);
    if (!inputedNumber) return;
    if (!gameActive) return;
    if (Number(score.textContent) === 0) {
        displayMessage('You Lose!');
        number.textContent = randomNumber;
        body.style.backgroundColor = COLORS.lose;
        gameActive = false;
        return;
    }
    if (inputedNumber < 1 || inputedNumber > 20) {
        displayMessage('🚫 Please enter a number between 1 and 20!');
        return;
    }


    if (inputedNumber > randomNumber) {
        displayMessage(inputedNumber > randomNumber + 5 ? '📈 Too High Number' : '📈 High Number');
        body.style.backgroundColor = inputedNumber > randomNumber + 5 ? COLORS.max : COLORS.min;
    } else if (inputedNumber < randomNumber) {
        displayMessage(inputedNumber < randomNumber - 5 ? '📉 Too Low Number' : '📉 Low Number')
        body.style.backgroundColor = inputedNumber < randomNumber - 5 ? COLORS.max : COLORS.min;
    } else {
        displayMessage('🎉 Correct Number!');
        number.textContent = randomNumber;
        body.style.backgroundColor = COLORS.win;
        number.style.width = '30rem';
        gameActive = false;
        CheckHighScores();
        return;
    }
    guess.value = '';
    score.textContent = Number(score.textContent) - 1;
    guess.focus();
    return;
}

check.addEventListener('click', guessGame);
againButton.addEventListener('click', again);
guess.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        guessGame();
    }
});
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-eg', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions



const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};


const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i)
  }));
  // console.log(combinedMovsDates)
  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);
  // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  combinedMovsDates.forEach((obj, i) => {
    const { movement, movementDate } = obj
    const type = movement > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(movementDate)
    const displayDate = formatMovementDate(date, acc.locale)
    const formattedMov = formatCur(movement, acc.locale, acc.currency)
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
}

// displayMovements(account1)

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(acc.balance.toFixed(2), acc.locale, acc.currency)}`;
}

// calcDisplayBalance(account1.movements)

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);
  const out = Math.abs(acc.movements.filter(mov => mov < 0)
  .reduce((acc, cur) => acc + cur, 0)
  .toFixed(2));
  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, mov) => acc + mov, 0)
    .toFixed(2)
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;
  labelSumOut.textContent = `${formatCur(out, acc.locale, acc.currency)}`
  labelSumInterest.textContent = `${formatCur(interest, acc.locale, acc.currency)
    }`
}
// calcDisplaySummary(account1.movements)

const createUsernames = (accs) => {
  (accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  }));


}

createUsernames(accounts)


const updateUI = (acc) => {
  displayMovements(acc);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
}


// const makingtime = minutes => minutes * 1000 * 60 * 60



const startLogoutTimer = () => {
  const tick = () => {
  const min = String(Math.trunc(time / 60)).padStart(2,'0');
  const sec = String(Math.trunc(time % 60)).padStart(2,'0')
  labelTimer.textContent = `${min}:${sec}`
  
  if (time ===0) {
    clearInterval(timer);
    labelWelcome = "Login to get started"
    containerApp.style.opacity = 0;
  }
  time--;

  }
  // set time to 5 minutes
  let time = 5 * 60;
  // call the timer every second
  tick()
  const timer = setInterval(tick, 1000);
  return timer
}





let currentAccount, timer;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) || alert('user is not registered');
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    
    // creating current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // update the UI
    timer ? clearInterval(timer): ''
    timer = startLogoutTimer()
    updateUI(currentAccount)
  } else { alert("pin is wrong try again later") }


})


btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = +inputTransferAmount.value || alert("Wrong amount");
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value) || alert("No user with this name");
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // send money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount)
    // update time
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString())
    // update UI
    updateUI(currentAccount)

    // reset timer
    clearInterval(timer);
    timer = startLogoutTimer();


  }
})


btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanamount = Math.trunc(inputLoanAmount.value);
  inputLoanAmount.value = "";
  if (loanamount > 0 && currentAccount.movements.some(mov => mov >= loanamount * 0.1)) {
    
    setTimeout(() => {
      // add the money
      currentAccount.movements.push(loanamount);
      // add the date
      currentAccount.movementsDates.push(new Date().toISOString())
      // update UI
      updateUI(currentAccount);
    }, 5000);
  }
  else alert('you cant take this loan');
  // reset timer
  clearInterval(timer);
  timer = startLogoutTimer();

})



btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const user = inputCloseUsername.value
  const pin = +inputClosePin.value
  let index;
  inputCloseUsername.value = inputClosePin.value = ''
  if (user === currentAccount.username && pin === currentAccount.pin) {
    index = accounts.findIndex(mov => mov.username === user)
    // console.log(accounts[index])
    accounts.splice(index, 1);
    // console.log(accounts)
    containerApp.style.opacity = 0;

  }
  else {
    alert('wrong username and pin')
  }
})


let sorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  sorted = !sorted
  displayMovements(currentAccount, sorted);
})

























/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





// console.log(Number.parseInt('  675rem 76.6hell 57street'))
// console.log(Number.isNaN(+'20'))
// console.log(Number.isFinite(20))
// console.log(Number.isFinite('20'))
// console.log(Number.isFinite(+'20'))
// console.log(Number.isInteger(+'20'))
// console.log(Number.isFinite('50x'))
// console.log(Number.isFinite(+'50x'))
// console.log(Math.trunc(Math.random() * 6))
// const ranomInt = (min, max) => Math.floor(Math.random()*(max - min + 1) + min)
// console.log(ranomInt(5,10))



// creating dates
// mybirthday
// const myBirthDay = new Date(1999, 3,28,12,15,18)
// console.log(myBirthDay)
// console.log(myBirthDay.getFullYear())
// console.log(myBirthDay.getMonth())
// console.log(myBirthDay.getDate())
// console.log(myBirthDay.getHours())
// console.log(myBirthDay.getMinutes())
// console.log(myBirthDay.getSeconds())
// console.log(myBirthDay.getDay())
// console.log(myBirthDay.getTime())
// console.log(myBirthDay.toISOString())
// console.log(myBirthDay.toDateString())

// // starting time for date
// // console.log(new Date(0))    

// // set time out
// setInterval(() => {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
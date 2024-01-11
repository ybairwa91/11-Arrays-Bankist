'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
///+++++++++++++++SLICE()++++++++++++++++++///
let arr = ['a', 'b', 'c', 'd', 'e'];
//slice(includes,not includes)
console.log(arr.slice(2));
console.log(arr.slice(2, 3));
console.log(arr.slice(2, 4));
console.log(arr.slice(2, arr.length));
//negatives
//slice(-start from this index backward counting,-move backward)
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(-3));
console.log(arr.slice(-4));
console.log(arr.slice(-5));
console.log(arr.slice(1, -2));
//0 parameter provides whole array itself
console.log(arr.slice(0));
//(to create shallow copy of an array)
console.log(arr.slice());
//another way to get shallow copies
console.log([...arr]);

///+++++++++++++++SPLICE()+++++++++++++++
//affect the original array unlike slice method
//mainly use to delete elements from an array
//one simple case is removing last element of an array
console.log(arr.splice(arr.length - 1));
// console.log(arr.splice(1));
console.log(arr);
//splice(starting index to delete,number of element to delete)
console.log(arr.splice(1, 2)); //means b and c deleted
console.log(arr);

///++++++++++++++++REVERSE()+++++++++
//affect real array as well
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

///+++++++++++++++++CONCAT()+++++++++++
const letters = arr.concat(arr2);
console.log(letters);
//other way to add
console.log([...arr, ...arr2]);

///++++++++++++++++++++JOIN Method++++++++++++++++++++
//reslt will be string with a seperater passes as an argument
console.log(letters.join('-'));



///+++++++++++++THE NEW AT METHOD++++++++
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//to get last element
console.log(arr[arr.length - 1]);
console.log(arr.at(arr.length - 1));
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log(arr.at(-2));
console.log(arr.at(-3));
console.log(arr.at(0));
//at works on string
console.log('jonas'.at(0));
console.log('jonas'.at(-1));

///+++++++++++++FOREACH METHOD+++++++++++++++
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//looping
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}:You Deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
//same thing with forEach
movements.forEach(function (movement, index, array) {
  // console.log(array)gives the array on which we using method
  if (movement > 0) {
    console.log(`Movement ${index}:You Deposited ${movement}`);
  } else {
    console.log(`Movement ${index}:You withdrew ${Math.abs(movement)}`);
  }
});

//0:function(200)
//1:function(450)
//2:function(400)
//3 ...
//forEach() with map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(currencies);
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
  // console.log(map)
});
//forEach() method for set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, valueAlso, set) {
  console.log(`${valueAlso}:${value}`);
});
*/

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

const displayMovements = function (movements) {
  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          
          <div class="movements__value">${mov}</div>
        </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data
 into an array (one array for each).
 For now, they are just interested in knowing whether a dog is an adult or a puppy. 
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
 and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs!
 So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice 
 to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") 
or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀


//soln

function checkDogs(dogJulia, dogsKate) {
  let newArrJulia = dogJulia.slice();
  newArrJulia.splice(0, 1);
  newArrJulia.splice(-2);
  console.log(newArrJulia);

  const bothArr = [...newArrJulia, ...dogsKate];

  bothArr.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`dog number ${i + 1} is adult and its ${dog} years old`)
      : console.log(`dog number ${i + 1} is still puppy 🐶`);
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

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

///+++++++++++++++DATA TRANSFORMERS+++++++++++++++++++
//MAP,FILTER,REDUCE

//++++++++++++++MAP+++++++++++++++
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movementsUSD = movements.map(function (mov) {
  return eurToUsd * mov;
});
console.log(movements);
console.log(movementsUSD);

let movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}

console.log(movementsUSDfor);

//
const movementsUSDUseArrow = movements.map(mov => mov * eurToUsd);
console.log(movementsUSDUseArrow);

const movementsDescription = movements.map((mov, i) => {
  `Movement ${i + 1}: You ${mov > 1 ? 'Deposited' : 'Withdrawn'}`;
  if (mov > 0) {
    return `Movements ${i + 1}:You deposited ${mov}`;
  } else {
    return `Movements ${i + 1}:You withdraw ${Math.abs(mov)}`;
  }
});
console.log(movementsDescription);



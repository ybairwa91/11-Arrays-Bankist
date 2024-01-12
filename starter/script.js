'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jayash Sharma',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jennifer Devi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Salman The Warrior',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sara Sharma',
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

let inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//creating username
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(ele => ele.at(0))
      .join('');
  });
};
createUserNames(accounts);

//adding html text dynamically using html
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
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

//Displaybalance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} £`;
};

//displaySummary
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income} £`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(out)} £`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (1.2 / 100))
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} £`;
};

//Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  //
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  //
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN');
    //Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Display Movements
    displayMovements(currentAccount.movements);
    //Display Balance
    calcDisplayBalance(currentAccount);
    //Display Summary
    calcDisplaySummary(currentAccount);
  }
});
//
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    console.log('Transfer Valid');
  }
});

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
///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages 
to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old 
(which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs 
(you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

let humanAge, avg;
const calcAverageHumanAge = function (age) {
  const humanAgeArr = age.map((dogAge, i, arr) => {
    dogAge <= 2 ? (humanAge = 2 * dogAge) : (humanAge = 16 + dogAge * 4).filter(age=>age>=18)
    return humanAge;
  });
  console.log(humanAgeArr);
  avg =
    humanAgeArr.reduce((acc, curr, i, arr) => acc + curr, 0) /
    humanAgeArr.length;
  console.log(avg);

  //avg
  //2,3  (2+3)/2===2/2+2/3=2.5
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

///////////////////////////////////////
// Coding Challenge #3

const calcAverageHumanAge = ages => {
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
};

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge,
 but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
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

/*
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

///++++++++++++FILTER METHOD+++++++++++++
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
console.log(movements);

const depositsFor = [];
for (const mov of movements)
  if (mov > 0) {
    depositsFor.push(mov);
  }
console.log(depositsFor);

const withdrawals = movements.filter((mov, i, arr) => mov < 0);
console.log(withdrawals);

///+++++++++++++++++REDUCE METHOD++++++++++++++++++++++++++++
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator is like a snowball
const balanceo = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i} ${acc}`);
  return acc + cur;
}, 0);
console.log(balanceo);
//arrow fun
const balance = movements.reduce((acc, curr) => acc + curr);
console.log(balance);
//same using for loop
let sum = 0;
for (const mov of movements) {
  sum += mov;
}
console.log(sum);


//CHAINING METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//PIPELINE
const totalDespositedUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    mov * eurToUsd;
  })
  .reduce((acc, ele, i, arr) => acc + ele);
// console.log(totalDespositedUSD);


///++++++++++++++++THE FIND METHOD++++++++++++++++++++
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//returns the element(not array) which encounter first in the given array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);
const accountJes = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountJes);

for (const acc of accounts) {
  const jess = acc.owner === 'Jessica Davis' ? acc : '';
  console.log(jess);
}

*/

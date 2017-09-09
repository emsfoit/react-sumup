var fs = require('fs');


const STATUSES = ['successful', 'successful', 'successful', 'failed', 'refunded'];
const TYPES = ['card', 'cash'];

function getRandomInt(min, max) {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  const ranNumber = Math.random();

  return Math.floor(ranNumber * (maxNumber - minNumber + 1)) + minNumber;
}

function drawRandom(arr) {
  const index = getRandomInt(0, arr.length - 1);
  return arr[index];
}

function randomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const ranNumber = Math.random();

  return new Date(startTime + ranNumber * (endTime - startTime));
}

function randomAmount(min, max) {
  const multiplier = 100;
  const minNumber = min * multiplier;
  const maxNumber = max * multiplier;

  return getRandomInt(minNumber, maxNumber) / multiplier;
}

function randomTransaction() {
  const timestamp = randomDate(new Date(2017, 2, 1), new Date());
  const amount = randomAmount(1, 200);
  const type = drawRandom(TYPES);
  const status = drawRandom(STATUSES);

  return { timestamp, amount, type, status };
}

function generateRandomTransactions(count = 100) {
  if (typeof count !== 'number') {
    throw Error(`${count} is not a valid number`);
  }

  const array = Array(count).fill(0);
  const transactions = array.map(() => randomTransaction());

  transactions.sort(
    (a, b) => new Date(b['timestamp']) - new Date(a['timestamp'])
  );

  return transactions;
}
var m =JSON.stringify(generateRandomTransactions());

fs.writeFile('transactions.json',m, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

console.log(generateRandomTransactions())
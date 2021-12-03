const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let rows = data.split('\r\n');

  rows = rows.map((number) => number.split('').map(bit => +bit));

  return rows;
}

function solve(array) {
  const count = array.reduce((prev, curr) => {
    return curr.map((bit, i) => prev[i] += bit)
  }, array[0].map(() => 0))

  const mostCommon = count.map(bitCount => +(bitCount > array.length/2))
  const leastCommon = mostCommon.map(bit => +!bit)

  const gammaRate = +mostCommon.join('')
  const gammaRateDecimal = parseInt(gammaRate, 2)

  const epsilonRate = +leastCommon.join('')
  const epsilonRateDecimal = parseInt(epsilonRate, 2)

  console.log(gammaRateDecimal * epsilonRateDecimal);
}

const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let rows = data.split(',').map((fish) => +fish);

  return rows;
}

function groupByValue(array) {
  return Array(9)
    .fill()
    .map(
      (dummy, valueIndex) =>
        array.filter((fishValue) => fishValue === valueIndex).length
    );
}

function step(array) {
  return array.reduce((accumulatingArray, amount, fishValue) => {
    const newArray = [...accumulatingArray];
    const newFishValue = fishValue - 1;

    newArray[8] += (newFishValue === -1) * amount;
    newArray[newFishValue === -1 ? 6 : newFishValue] += amount;

    return newArray;
  }, Array(9).fill(0));
}

function solve(array) {
  let fishValues = groupByValue(array);

  for (let index = 0; index < 256; index++) {
    fishValues = step(fishValues);
  }

  console.log(fishValues.reduce((prev, curr) => prev + curr));
}

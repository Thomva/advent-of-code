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

function step(array) {
  return array
    .map((fishValue) => {
      const newFishValue = fishValue - 1;
      return newFishValue === -1 ? [6, 8] : newFishValue;
    })
    .flat();
}

function solve(array) {
  let fishValues = [...array];

  for (let index = 0; index < 80; index++) {
    fishValues = step(fishValues);
  }

  console.log(fishValues.length);
}

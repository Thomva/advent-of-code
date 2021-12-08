const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let rows = data.split(',').map((crab) => +crab);

  return rows;
}

function getFrequency(array) {
  return array.reduce(
    (prev, curr) => ({ ...prev, [curr]: (prev[curr] || 0) + 1 }),
    {}
  );
}

function getFuelCost(frequency, target) {
  const totalFuel = Object.keys(frequency).reduce((prev, curr) => {
    const fuelCost = Math.abs(+curr - target) * frequency[curr];
    return prev + fuelCost;
  }, 0);
  return totalFuel;
}

function solve(array) {
  const frequency = getFrequency(array);

  let fuels = Object.keys(frequency).map((key) => getFuelCost(frequency, +key));
  leastFuel = fuels.sort((a, b) => a - b)[0];

  console.log(leastFuel);
}

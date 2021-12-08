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
    const distance = Math.abs(+curr - target);
    const fuelCostPerCrab = Array(distance)
      .fill()
      .reduce((prev, curr, i) => prev + i + 1, 0);
    const fuelCost = frequency[curr] * fuelCostPerCrab;
    return prev + fuelCost;
  }, 0);
  return totalFuel;
}

function solve(array) {
  const frequency = getFrequency(array);

  const min = array.sort((a, b) => a - b)[0];
  const max = array.sort((a, b) => b - a)[0];

  let fuels = Array(max - min)
    .fill()
    .map((dummy, index) => getFuelCost(frequency, index + min));
  leastFuel = fuels.sort((a, b) => a - b)[0];

  console.log(leastFuel);
}

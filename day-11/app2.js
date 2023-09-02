const fs = require('fs');

try {
  const data = fs.readFileSync('./test-input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let octopuses = data.split('\n');
  octopuses = displays.map((row) => row.split(''));
  return octopuses;
}

function step() {
  // +1

  // All with 9

  // when octopuses with 8, check adjacent of flashed (All in chain reaction)

  // Reset them to 0
};

function solve(array) {
  console.log(array);
}

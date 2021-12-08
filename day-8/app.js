const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let displays = data.split('\r\n');
  displays = displays.map(display => {
    const number = display.split(' ');
    const digits = number.splice(0, number.indexOf('|'));
    number.shift();
    return {digits, number };
  });
  return displays;
}

function solve(array) {
  const uniqueSegmentCounts = [2, 3, 4, 7]
  const display = array.reduce((prev, curr) => {
    return prev + curr.number.filter(numberDigit => uniqueSegmentCounts.includes(numberDigit.length)).length
  }, 0)
  console.log(display);
}

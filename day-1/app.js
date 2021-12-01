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

  rows = rows.map((depth) => +depth);

  return rows;
}

function solve(array) {
  const result = array.reduce((prev, curr, index) => {
    return (prev += array[index - 1] < curr);
  }, 0);

  console.log(result);
}

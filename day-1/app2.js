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
  let newArray = [];

  array.forEach((depth, i) => {
    if (!array[i + 2]) return;
    const sum = array[i] + array[i + 1] + array[i + 2];
    newArray.push(sum);
  });

  const result = newArray.reduce((prev, curr, index) => {
    return (prev += newArray[index - 1] < curr);
  }, 0);

  console.log(result);
}

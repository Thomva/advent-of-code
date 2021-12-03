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

  rows = rows.map((number) => number.split('').map((bit) => +bit));

  return rows;
}

function getCommonAtIndex(array, index, isLeastCommon) {
  const count = array.reduce((prev, curr) => {
    return (prev += curr[index]);
  }, 0);

  if (isLeastCommon) {
    return count === array.length / 2 ? 0 : +(count < array.length / 2);
  }
    
  return count === array.length / 2 ? 1 : +(count > array.length / 2);
}

function solve(array) {
  let filteredArrayMostCommon = Array.from([...array]);
  let filteredArrayLeastCommon = Array.from([...array]);

  for (let index = 0; index < array[0].length; index++) {
    const mostCommon = getCommonAtIndex(
      filteredArrayMostCommon,
      index
    );

    const leastCommon = getCommonAtIndex(
      filteredArrayLeastCommon,
      index,
      true
    );

    if (filteredArrayMostCommon.length > 1) {
      filteredArrayMostCommon = filteredArrayMostCommon.filter(
        (number) => number[index] === mostCommon
      );
    }

    if (filteredArrayLeastCommon.length > 1) {
      filteredArrayLeastCommon = filteredArrayLeastCommon.filter(
        (number) => number[index] === leastCommon
      );
    }
  }

  const mostCommonDecimal = parseInt(+filteredArrayMostCommon[0].join(''), 2);
  const leastCommonDecimal = parseInt(+filteredArrayLeastCommon[0].join(''), 2);

  console.log(mostCommonDecimal * leastCommonDecimal);
}

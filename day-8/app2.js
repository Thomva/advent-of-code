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
  displays = displays.map((display) => {
    const number = display.split(' ');
    const digits = number.splice(0, number.indexOf('|'));
    number.shift();
    return { digits, number };
  });
  return displays;
}

function sortString(string) {
  return string.split('').sort().join('');
};

function getSegmentCountWithoutSegments(digitArray, segmentArray) {
  return digitArray.filter((segment) => !segmentArray.includes(segment)).length;
}

function filterBySegmentCount(
  remainingDigits,
  table,
  subtractDigit,
  targetCount,
  foundNumber
) {
  const filter = Object.keys(table).find((key) => table[key] === subtractDigit);

  const newTable = { ...table };

  const newRemainingDigits = remainingDigits.filter((digit) => {
    const segmentCount = getSegmentCountWithoutSegments(
      digit.split(''),
      filter.split('')
    );

    if (segmentCount === targetCount) {
      newTable[sortString(digit)] = foundNumber;
      return false;
    }

    return true;
  });

  return { newRemainingDigits, newTable };
}

function findDigits(digitArray) {
  let table = {};
  let remainingDigits = digitArray;

  // 1, 4, 7, 8
  remainingDigits = remainingDigits.filter((digit) => {
    const uniqueSegmentCounts = [2, 3, 4, 7];

    if (!uniqueSegmentCounts.includes(digit.length)) return true;

    let number;

    switch (digit.length) {
      case 2:
        number = 1;
        break;
      case 3:
        number = 7;
        break;
      case 4:
        number = 4;
        break;

      default:
        number = 8;
        break;
    }

    table[sortString(digit)] = number;
  });

  const filtered3 = filterBySegmentCount(remainingDigits, table, 1, 3, 3);
  remainingDigits = filtered3.newRemainingDigits;
  table = filtered3.newTable;

  const filtered6 = filterBySegmentCount(remainingDigits, table, 1, 5, 6);
  remainingDigits = filtered6.newRemainingDigits;
  table = filtered6.newTable;

  const filtered0 = filterBySegmentCount(remainingDigits, table, 3, 2, 0);
  remainingDigits = filtered0.newRemainingDigits;
  table = filtered0.newTable;

  const filtered2 = filterBySegmentCount(remainingDigits, table, 4, 3, 2);
  remainingDigits = filtered2.newRemainingDigits;
  table = filtered2.newTable;

  const filtered5 = filterBySegmentCount(remainingDigits, table, 6, 0, 5);
  remainingDigits = filtered5.newRemainingDigits;
  table = filtered5.newTable;

  table[sortString(remainingDigits[0])] = 9;

  return table;
}

function solve(array) {
  const total = array.reduce((prev, curr) => {
    const table = findDigits(curr.digits);
    const output = +curr.number.map(numberDigit => table[sortString(numberDigit)]).join('')
    return prev + output;
  }, 0)

  console.log(total);
}

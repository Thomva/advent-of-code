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

  rows = rows.map((instruction) => {
    const splitInstruction = instruction.split(' ');
    return [splitInstruction[0], +splitInstruction[1]]
  });

  return rows;
}

function solve(array) {
  const submarine = {
    horizontalPos: 0,
    depth: 0,
    aim: 0
  }

  array.forEach(instruction => {
    const [type, amount] = instruction;

    switch (type) {
      case 'forward':
        submarine.horizontalPos += amount
        submarine.depth += submarine.aim * amount
        break;
      case 'down':
        submarine.aim += amount
        break;
    
      default:
        submarine.aim -= amount
        break;
    }
  });

  const answer = submarine.horizontalPos * submarine.depth;

  console.log(answer);
}

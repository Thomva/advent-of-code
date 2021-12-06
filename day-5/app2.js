const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let rows = data.split('\n');
  rows = rows.map((line) =>
    line
      .split(' -> ')
      .map((coord) => coord.split(',').map((coordHalf) => +coordHalf))
  );
  return rows;
}

function getPoints(line) {
  const [start, end] = line;
  const points = [];

  const deltaX = start[0] - end[0];
  const deltaY = start[1] - end[1];

  switch (true) {
    case deltaX !== 0 && deltaY === 0:
      // Horizontal
      for (
        let x = -Math.sign(deltaX) * start[0];
        x <= -Math.sign(deltaX) * end[0];
        x++
      ) {
        points.push([Math.abs(x), start[1]]);
      }
      break;
    case deltaX === 0 && deltaY !== 0:
      // Vertical
      for (
        let y = -Math.sign(deltaY) * start[1];
        y <= -Math.sign(deltaY) * end[1];
        y++
      ) {
        points.push([start[0], Math.abs(y)]);
      }
      break;

    default:
      // Diagonal
      for (
        let x = -Math.sign(deltaX) * start[0],
          y = -Math.sign(deltaY) * start[1];
        x <= -Math.sign(deltaX) * end[0] && y <= -Math.sign(deltaY) * end[1];
        x++, y++
      ) {
        points.push([Math.abs(x), Math.abs(y)]);
      }
      break;
  }
  return points;
}

function countOverlapPoints(points) {
  let countedPoints = {};

  points.forEach((point) => {
    countedPoints[point.join('-')] = (countedPoints[point.join('-')] || 0) + 1;
  });

  const totalPoints = Object.keys(countedPoints).filter(
    (key) => countedPoints[key] > 1
  ).length;

  return totalPoints;
}

function solve(array) {
  const points = [];

  array.forEach((line) => {
    points.push(...getPoints(line));
  });

  console.log(countOverlapPoints(points));
}

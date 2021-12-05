const fs = require('fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  const rows = data.split('\n').filter((row) => row !== '');

  const numbers = rows[0].split(',').map((number) => +number);

  let boards = [];

  for (let index = 1, indexB = 0; index < rows.length; index++) {
    if (index > 5 && (index - 1) % 5 === 0) indexB++;
    const formattedRow = rows[index]
      .split(' ')
      .filter((number) => number !== '')
      .map((number) => +number);
    boards[indexB] = Array.isArray(boards[indexB])
      ? [...boards[indexB], ...formattedRow]
      : formattedRow;
  }

  return { numbers, boards };
}

function checkRow(board) {
  return board.some((number, index) => {
    if (index % 5 === 0) {
      const row = board.slice(index, index + 5);

      return row.every((rowNumber) => rowNumber === -1);
    }
  });
}

function checkColumn(board) {
  return Array(5)
    .fill()
    .some((number, index) => {
      const column = board.filter(
        (cellNumber, cellIndex) => cellIndex % 5 === index
      );

      return column.every((rowNumber) => rowNumber === -1);
    });
}

function solve(array) {
  let { numbers, boards } = array;

  let lastNumber;
  let lastBoard;

  numbers.some((number) => {
    lastNumber = number;
    boards = boards.map((board) =>
      board.map((boardNumber) => (boardNumber === number ? -1 : boardNumber))
    );
    return boards.some((board) => {
      lastBoard = board;

      const hasRow = checkRow(board);
      const hasColumn = checkColumn(board);

      return hasRow || hasColumn;
    });
  });

  const sumUnmarked = lastBoard.filter(number => number !== -1).reduce((prev, curr) => prev + curr)

  console.log(sumUnmarked * lastNumber);
}

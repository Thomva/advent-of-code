const fs = require('fs');

try {
  const data = fs.readFileSync('./test-input.txt', 'utf8');
  const arrayFromData = processData(data);

  solve(arrayFromData);
} catch (error) {
  console.log('Error: ', error.stack);
}

function processData(data) {
  let octopuses = data.split('\r\n');
  octopuses = octopuses.map((row) => row.split('').map((octopus) => +octopus));
  return octopuses;
}

function adjacentFlashes(x, y, flashedOctopuses, octopuses) {
  let flashes = 0;
  let newFlashedOctopuses = [];
  for (let offsetY = -1; offsetY < 2; offsetY++) {
    for (let offsetX = -1; offsetX < 2; offsetX++) {
      // console.log(octopuses[y + offsetY]?.[x + offsetX]);
      const adjacentOctopus = octopuses[y + offsetY]?.[x + offsetX];
      const adjacentOctopusCoords = `${x + offsetX},${y + offsetY}`;
      if (flashedOctopuses.includes(adjacentOctopusCoords) || adjacentOctopus <= 9) break
      // if (adjacentOctopus <= 9) break
      newFlashedOctopuses.push(adjacentOctopusCoords);
      flashes++;
    }
  }
  // console.log('flashes');
  // console.log(flashes);
  return [newFlashedOctopuses, flashes];
}

function step(octopuses) {
  let flashes = 0;
  let newOctopuses = [];
  // console.log(octopuses);
  // TODO: store flashed octopuses en don't count them twice when checking adjacent flashes
  let flashedOctopuses = [];
  console.table(octopuses.map((row) => row.join('')));

  // +1
  newOctopuses = octopuses.map((row) => row.map((octopus) => octopus + 1));
  console.table(newOctopuses.map((row) => row.join('-')));

  // Chain react
  newOctopuses = newOctopuses.map((row, y) =>
    row.map((octopus, x) => {
      // if (y !== 1 && x !== 1) return;
      const [newFlashedOctopuses, flashes] = adjacentFlashes(x, y, flashedOctopuses, newOctopuses);
      flashedOctopuses = newFlashedOctopuses;
      return octopus + flashes;
    })
  );
  console.table(flashedOctopuses);
  console.table(newOctopuses.map((row) => row.join('-')));
  newOctopuses = newOctopuses.map((row, y) =>
    row.map((octopus, x) => {
      // if (y !== 1 && x !== 1) return;
      const [newFlashedOctopuses, flashes] = adjacentFlashes(x, y, flashedOctopuses, newOctopuses);
      flashedOctopuses = newFlashedOctopuses;
      return octopus + flashes;
    })
  );
  console.table(newOctopuses.map((row) => row.join('-')));

  // Reset
  newOctopuses = newOctopuses.map((row) =>
    row.map((octopus) => {
      const flash = octopus > 9;
      flashes += flash;
      return flash ? 0 : octopus;
    })
  );
  // console.log('flashes');
  // console.log(flashes);

  return { newOctopuses, flashes };
}

function solve(array) {
  const steps = 2;
  let totalFlashes = 0;
  let octopuses = array;
  for (let index = 0; index < steps; index++) {
    console.log('step ', index);
    const { newOctopuses, flashes } = step(octopuses);
    // console.log(newOctopuses.map(row => row.join('')));
    console.log('step result ', index);
    console.table(newOctopuses.map((row) => row.join('')));
    octopuses = newOctopuses;
    totalFlashes += flashes;
  }
  console.log(totalFlashes);
}

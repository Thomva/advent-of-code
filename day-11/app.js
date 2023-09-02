const fs = require('fs');

class Octopus {
  constructor(energy, x, y) {
    this.flashed = false;
    this.flashes = 0;
    this.energy = energy;
    this.x = x;
    this.y = y;
  }
  increaseEnergy() {
    if (!this.flashed) {
      this.energy++;
    }
  }
  flash() {
    if (!this.flashed && this.energy > 9) {
      this.flashed = true;
      this.flashes++;
    }

    return this.flashed;
  }
  rest() {
    if (this.flashed) {
      this.flashed = false;
      this.energy = 0;
    }
  }
  adjacentOctopuses() {
    return [-1, 0, 1]
      .map((valueY, offsetY) => {
        return [-1, 0, 1].map((valueX, offsetX) => {
          return {
            x: this.x + offsetX,
            y: this.y + offsetY,
          };
        });
      })
      .filter((coords) => coords.x !== this.x && coords.y !== this.y);
  }
}

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

function getAdjacentOctopuses(octopus, octopuses) {
  return octopus.adjacentOctopuses().map((coords) =>
    octopuses.find(
      (oct) => oct.x === coords.x && oct.y === coords.y && !oct.flashed
    )
  );
}

function sweep(octopuses) {
  octopuses.forEach((octopus) => {
    if (!octopus.flashed && octopus.flash()) {
      getAdjacentOctopuses(octopus, octopuses).forEach((adjacentOctopus) =>
        adjacentOctopus?.increaseEnergy()
      );
    }
  });

  const needToFlash = octopuses.filter(
    (octopus) => octopus.energy > 9 && !octopus.flashed
  );

  if (needToFlash.length) {
    sweep();
  }
}

function step(octopuses) {
  console.log(octopuses);
  octopuses.forEach((octopus) => {
    octopus.increaseEnergy();
  });

  sweep(octopuses);

  octopuses.forEach((octopus) => {
    octopus.rest();
  });
}

function solve(array) {
  const steps = 2;
  let octopuses = array
    .map((row, x) =>
      row.map((octopusEnergy, y) => new Octopus(octopusEnergy, x, y))
    )
    .flat();

  for (let index = 0; index < steps; index++) {
    console.log('step ', index);
    step(octopuses);
  }

  const totalFlashes = octopuses.reduce((prev, curr) => prev + curr.flashes, 0)

  console.log(totalFlashes);
}

const fs = require('fs');

const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
// const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const galaxies = [];

let rowCount = 0;
const grid = [];

lines.forEach((line, ln) => {
  grid.push(line);
});

const doublyCols = {};
let numOfCols = 0;
for(let i = 0; i < grid[0].length; i++) {
  let found = false;
  grid.forEach((line) => {
    if (line.charAt(i) === '#') {
      found = true;
    }
  });
  if (!found) {
    numOfCols++;
  }
  doublyCols[i] = numOfCols;
  numOfCols++;
}
console.log(doublyCols);


grid.forEach((line, ln) => {
  const matches = [...line.matchAll(/#/g)];
  if (matches.length) {
    matches.forEach((match) => {
      galaxies.push({ col: doublyCols[match.index], row: rowCount });
    });
  } else {
    rowCount++;
  }
  rowCount++;
});

for(let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    sum += Math.abs(galaxies[j].row - galaxies[i].row) + Math.abs(galaxies[j].col - galaxies[i].col);
  }
}

console.log(galaxies);
console.log(sum);
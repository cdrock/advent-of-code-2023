const fs = require('fs');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const schematics = [];
const gears = {};

lines.forEach((line) => {
  schematics.push(line);
});

const LINE_LENGTH = schematics[0].length;
const NUM_OF_LINES = schematics.length;

const checkForSymbol = (number, index, lineNumber) => {  
  const start = Math.max(index - 1, 0);
  const end = Math.min(index + number.length, LINE_LENGTH - 1);
  const top = Math.max(lineNumber - 1, 0);
  const bottom = Math.min(lineNumber + 1, NUM_OF_LINES - 1);

  for (let i = start; i <= end; i++) {
    for (let j = top; j <= bottom; j++) {
      const character = schematics[j][i];
      if (character == '*') {
        if (gears[`${j}-${i}`]) {
          gears[`${j}-${i}`].push(number);
        } else {
          gears[`${j}-${i}`] = [number];
        }
      }
    }
  }

  return false;
};

schematics.forEach((line, lineNumber) => {
  const numbers = [...line.matchAll((/(\d+)/g))];

  numbers.forEach((num) => {
    checkForSymbol(num[1], num.index, lineNumber);
  });
});

const ACTUAL_GEARS = Object.values(gears).filter((gear) => gear.length == 2);
ACTUAL_GEARS.forEach(([first, second]) => sum += first * second);

console.log(sum);
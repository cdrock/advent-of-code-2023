const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const schematics = [];

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
      if (!(character >= '0' && character <= '9') && character != '.') {
        return true;
      }
    }
  }

  return false;
};

schematics.forEach((line, lineNumber) => {
  const numbers = [...line.matchAll((/(\d+)/g))];

  numbers.forEach((num) => {
    const wasSymbol = checkForSymbol(num[1], num.index, lineNumber);
    if (wasSymbol) {
      sum += parseInt(num[1], 10);
    }
  });
});

console.log(sum);
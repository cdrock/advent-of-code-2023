const fs = require('fs');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const copies = {};

lines.forEach((line, lineNumber) => {
  if (!copies[lineNumber]) {
    copies[lineNumber] = 1;
  }
  const [,allNumbers] = line.split(':');
  const [winningNumbersStr, numbersStr] = allNumbers.split('|');
  const winningNumbers = winningNumbersStr.split(' ').filter(n => n);
  const numbers = numbersStr.split(' ').filter(n => n);

  let numberOfWins = 0;
  winningNumbers.forEach((winningNumber) => {
    if (numbers.includes(winningNumber)) {
      numberOfWins++;

      if (copies[numberOfWins + lineNumber]) {
        copies[numberOfWins + lineNumber] = copies[numberOfWins + lineNumber] + copies[lineNumber];
      } else {
        copies[numberOfWins + lineNumber] = 1 + copies[lineNumber];
      }
    }
  });
});

console.log(Object.values(copies).reduce((sum, a) => sum + a));
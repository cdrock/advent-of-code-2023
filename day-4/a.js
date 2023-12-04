const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach((line, lineNumber) => {
  const [,allNumbers] = line.split(':');
  const [winningNumbersStr, numbersStr] = allNumbers.split('|');
  const winningNumbers = winningNumbersStr.split(' ').filter(n => n);
  const numbers = numbersStr.split(' ').filter(n => n);

  let points = 0;
  winningNumbers.forEach((winningNumber) => {
    if (numbers.includes(winningNumber)) {
      points = (points == 0) ? 1 : points * 2;
    }
  });

  sum += points;
});
0
console.log(sum);
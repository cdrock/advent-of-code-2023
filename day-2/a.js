const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

lines.forEach((line, i) => {
  const reds = [...line.matchAll(/(\d*) red/g)];
  if (reds.some((red) => parseInt(red[1], 10) > MAX_RED)) return;

  const greens = [...line.matchAll(/(\d*) green/g)];
  if (greens.some((green) => parseInt(green[1], 10) > MAX_GREEN)) return;

  const blues = [...line.matchAll(/(\d*) blue/g)];
  if (blues.some((blue) => parseInt(blue[1], 10) > MAX_BLUE)) return;

  sum += i + 1;
});

console.log(sum);
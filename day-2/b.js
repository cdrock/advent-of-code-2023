const fs = require('fs');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach(line => {
  const reds = [...line.matchAll(/(\d*) red/g)];
  const greens = [...line.matchAll(/(\d*) green/g)];
  const blues = [...line.matchAll(/(\d*) blue/g)];

  const highestRed = Math.max(...reds.map(r => r[1]));
  const highestGreen = Math.max(...greens.map(r => r[1]));
  const highestBlue = Math.max(...blues.map(r => r[1]));

  sum += highestRed * highestGreen * highestBlue;
});

console.log(sum);
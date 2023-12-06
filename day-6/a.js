const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const races = [{}, {}, {}, {}];

lines.forEach((line, lineNumber) => {
  const values = [...line.matchAll(/(\d+)/g)].map(n => parseInt(n, 10));
  const prop = lineNumber === 0 ? 'time' : 'distance';
  values.forEach((val, i) => {
    races[i][prop] = val;
  });
});

const ranges = [];
races.forEach(({time, distance}) => {
  let min = Number.MAX_SAFE_INTEGER, max = 0;
  for (let i = 0; i <= time; i++) {
    if ((time - i) * i > distance) {
      min = Math.min(i, min);
      max = Math.max(i, max);
    }
  }

  ranges.push(max-min+1);
});

console.log(ranges.reduce((a, b) => a * b));
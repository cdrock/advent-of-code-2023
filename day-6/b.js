const fs = require('fs');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let time, distance;

lines.forEach((line, lineNumber) => {
  const val = line.replace(/ /g,'').split(':')[1];
  if (lineNumber === 0) {
    time = val;
  } else {
    distance = val;
  }
});

const ranges = [];
let min = Number.MAX_SAFE_INTEGER, max = 0;
for (let i = 0; i <= time; i++) {
  if ((time - i) * i > distance) {
    min = Math.min(i, min);
    max = Math.max(i, max);
  }
}

ranges.push(max-min+1);

console.log(ranges.reduce((a, b) => a * b));
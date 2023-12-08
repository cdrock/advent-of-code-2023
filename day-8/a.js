const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
// const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let count = 0;

let map = {};
let instructions;

lines.forEach((line, lineNumber) => {
  if (lineNumber == 0) {
    instructions = line.split('');
    return;
  }

  if (line === '') {
    return;
  }

  const matches = [...line.matchAll(/([A-Z][A-Z][A-Z]) = \(([A-Z][A-Z][A-Z]), ([A-Z][A-Z][A-Z])\)/g)];
  map[matches[0][1]] = [matches[0][2], matches[0][3]];
});

let currentMap = 'AAA';
while (currentMap !== 'ZZZ') {
  const instruction = instructions[count % instructions.length];
  if (instruction === 'L') {
    currentMap = map[currentMap][0];
  } else {
    currentMap = map[currentMap][1];
  }
  count++;
}

console.log(instructions);
console.log(count);
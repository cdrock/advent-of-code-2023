const fs = require('fs');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

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

  const matches = [...line.matchAll(/(\w\w\w) = \((\w\w\w), (\w\w\w)\)/g)];
  map[matches[0][1]] = [matches[0][2], matches[0][3]];
});

let currentMaps = Object.keys(map).filter(n => n.charAt(2) === 'A');
let stepsA = [];
currentMaps.forEach((currentMap) => {
  let count = 0;
  while (currentMap.charAt(2) !== 'Z') {
    const instruction = instructions[count % instructions.length];
    if (instruction === 'L') {
      currentMap = map[currentMap][0];
    } else {
      currentMap = map[currentMap][1];
    }
    count++;
  }
  stepsA.push(count);
});

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

console.log(stepsA.reduce(lcm));
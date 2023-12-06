const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const maps = [];
let seeds;

lines.forEach((line, lineNumber) => {
  if (!line) {
    return;
  }

  if (lineNumber === 0) {
    seeds = [...line.matchAll((/(\d+)/g))].map((n) => n[1]);
    return;
  }

  if (line.includes('map')) {
    maps.push([]);
    return;
  }

  numbers = [...line.matchAll((/(\d+)/g))].map((n) => parseInt(n[1], 10)).sort((a, b) => a[1] < b[1]);
  numbers.sort((a, b) => a[1] < b[1]);
  [destStart, sourceStart, range] = numbers;
  maps[maps.length-1].push({destStart, sourceStart, range});
});

const locations = [];
seeds.forEach((seed) => {
  let num = seed;
  maps.forEach((map, mapinx) => {
    for (let { destStart, sourceStart, range } of map) {
      if (num >= sourceStart && num < sourceStart + range) {
        num = num - (sourceStart - destStart);
        break;
      }
    }
  });
  locations.push(num);
});

console.log(Math.min(...locations));
const fs = require('fs');
const { start } = require('repl');

// const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const maps = [];
let seeds = [];

lines.forEach((line, lineNumber) => {
  if (!line) {
    return;
  }

  if (lineNumber === 0) {
    const seedValues = [...line.matchAll((/(\d+)/g))].map((n) => parseInt(n[1], 10));
    seedValues.forEach((val, i) => {
      if (i % 2 == 0) {
        seeds.push({startValue: val, endValue: seedValues[i+1] + val});
      }
    });
    return;
  }

  if (line.includes('map')) {
    maps.push([]);
    return;
  }

  numbers = [...line.matchAll((/(\d+)/g))].map((n) => parseInt(n[1], 10)).sort((a, b) => a[1] < b[1]);
  numbers.sort((a, b) => a[1] < b[1]);
  [destStart, sourceStart, range] = numbers;
  maps[maps.length-1].push({destStart, sourceStart, sourceEnd: sourceStart + range});
});

function getRanges(ranges, mapIndex) {
  const allRanges = [];

  ranges.forEach((range) => {
    const { startValue, endValue } = range;
    maps[mapIndex].forEach(({destStart, sourceStart, sourceEnd}) => {
      const rangeStart = Math.max(startValue, sourceStart);
      const rangeEnd = Math.min(endValue, sourceEnd)
      if (rangeEnd > rangeStart) {
        allRanges.push({startValue: rangeStart - (sourceStart - destStart), endValue: rangeEnd - (sourceStart - destStart)});
        console.log(destStart, {startValue: rangeStart - (sourceStart - destStart), endValue: rangeEnd - (sourceStart - destStart)});
        if (startValue < rangeStart) {
          ranges.push({startValue, endValue: rangeStart});
        }
        if (endValue > rangeEnd) {
          ranges.push({startValue: rangeEnd, endValue});
        }
        range.processed = true;
      }
    });
  });

  ranges.filter((n) => !n.processed).forEach((range) => allRanges.push(range));

  if (mapIndex == maps.length - 1) return allRanges;
  return getRanges(allRanges, mapIndex+1);
}

const ranges = getRanges(seeds, 0);
const mins = ranges.map(r => r.startValue);
console.log(Math.min(...mins));
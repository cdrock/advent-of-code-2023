const fs = require('fs');

const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const convert = function(str) {
  return parseInt(str, 10) || map[str];
}

lines.forEach(line => {
  const first = convert(line.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/)[1]);
  const last = convert(line.match(/.*(\d|one|two|three|four|five|six|seven|eight|nine).*/)[1]);

  sum += 10 * first + last;
});

console.log(sum);
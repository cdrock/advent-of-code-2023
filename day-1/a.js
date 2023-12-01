const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach(line => {
  var first, last;

  for (var i = 0; i < line.length; i++) {
    const char = line.charAt(i);
    if (/\d/.test(char)) {
      const num = parseInt(char, 10);
      if (!first) {
        first = num;
      }
      last = num;
    }
  }

  sum += 10 * first + last;
});

console.log(sum);
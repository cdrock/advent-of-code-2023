const fs = require('fs');

 const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
// const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;


lines.forEach((line, ln) => {
  const nums = [...line.matchAll((/(-?\d+)/g))].map((n) => parseInt(n[1], 10));
  const sequences = [nums];

  let getSequence = function(sequence) {
    const newSequence = [];
    for (let i = 0; i < sequence.length - 1; i++) {
      newSequence.push(sequence[i+1] - sequence[i]);
    }
    sequences.push(newSequence);
    if (newSequence.filter((n) => n != 0).length) {
      getSequence(newSequence);
    } else {
      const num = sequences.reduce((sum, a) => {
        return sum + a[a.length - 1]
      }, 0);
      sum += num;
    }
  }

  getSequence(nums);
});

console.log(sum);
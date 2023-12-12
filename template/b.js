const fs = require('fs');

const data = fs.readFileSync('input-b-test.txt', 'UTF-8');
// const data = fs.readFileSync('input-b.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

lines.forEach((line, ln) => {

});

console.log(sum);
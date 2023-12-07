const fs = require('fs');

// const data = fs.readFileSync('input-a-test.txt', 'UTF-8');
const data = fs.readFileSync('input-a.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

let sum = 0;

const cardValues = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

let getHandValue = function(hand) {
  const values = {};

  for (let i = 0; i < hand.length; i++) {
    char = hand.charAt(i);
    if (values[char]) {
      values[char]++;
    } else {
      values[char] = 1;
    }
  }

  const v = Object.values(values).sort().reverse();

  if (v[0] === 5) {
    return 7;
  } else if (v[0] === 4) {
    return 6;
  } else if (v[0] === 3 && v[1] == 2) {
    return 5;
  } else if (v[0] === 3) {
    return 4;
  } else if (v[0] === 2 && v[1] == 2) {
    return 3;
  } else if (v[0] === 2) {
    return 2;
  } else {
    return 1;
  }
}

const hands = [];
lines.forEach(line => {
  [hand, bid] = line.split(' ');
  const value = getHandValue(hand);
  hands.push({hand, bid, value});
});

const sortedHands = hands.sort((a, b) => {
  if (a.value != b.value) {
    return a.value - b.value;
  } else {
    for (let i = 0; i < 5; i++) {
      const card1 = cardValues[a.hand.charAt(i)];
      const card2 = cardValues[b.hand.charAt(i)];
      if (card1 != card2) {
        return card1 - card2;
      }
    }
  }
});

for (var i = 0; i < sortedHands.length; i++) {
  sum += (i + 1) * sortedHands[i].bid;
}

console.log(sum);
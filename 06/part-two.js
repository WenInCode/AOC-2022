const fs = require("fs");
const path = require("path");

function readInput() {
  return fs
    .readFileSync(path.join(__dirname, "puzzle-06-input.txt"), "utf8")
    .trim();
}

function findKey(data) {
  let tracker = {};
  let buffer = [];

  for (let i = 0; i <= data.length - 1; i++) {
    tracker[data[i]] = tracker[data[i]] ? tracker[data[i]] + 1 : 1;
    buffer.push(data[i]);

    if (i > 13) {
      const valueToRemove = buffer.shift();

      if (tracker[valueToRemove] === 1) {
        delete tracker[valueToRemove];
      } else {
        tracker[valueToRemove] -= 1;
      }
    }

    if (i >= 13 && Object.values(tracker).sort((a, b) => b - a)[0] == 1) {
      return i + 1;
    }

  }
}

function answer() {
  const data = readInput();
  return findKey(data);
}

console.log(answer());

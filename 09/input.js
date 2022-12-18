const fs = require('fs');
const path = require('path');

function readMoves(filename) {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(line => {
      let parts = line.split(' ');
      return {
        direction: parts[0],
        amount: parseInt(parts[1], 10)
      };
    });
}

module.exports = { readMoves };

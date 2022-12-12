const fs = require('fs');
const path = require('path');

function readInput() {
  return fs.readFileSync(path.join(__dirname, 'puzzle-07-input.txt'), 'utf8').toString().trim().split('\n');
}

module.exports = { readInput };

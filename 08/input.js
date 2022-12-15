const fs = require('fs');
const path = require('path');

function readInput() {
  return fs.readFileSync(path.join(__dirname, 'puzzle-08-input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(row => row.split('').map(tree => parseInt(tree, 10)));
}

module.exports = {
  readInput
};

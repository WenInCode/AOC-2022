const { readInput } = require('./input');

function look(row, col, trees) {
  let tree = trees[row][col];

  return (
    // left 
    Math.max(...trees[row].slice(0, col)) < tree ||
    //right
    Math.max(...trees[row].slice(col + 1)) < tree ||
    // up
    Math.max(...[...Array(row)].map((item, index) => trees[index][col])) < tree ||
    // down
    Math.max(...[...Array(trees.length - row - 1)].map((item, index) => trees[index + row + 1][col])) < tree);
}

function getVisibleTrees(trees) {
  let visibleCount = (trees.length * 2) - 4 + (trees[0].length * 2);

  for (let row = 1; row <= trees.length - 2; row++) {
    for (let col = 1; col <= trees[row].length - 2; col++) {
      visibleCount += look(row, col, trees) ? 1 : 0;
    }
  }
  
  return visibleCount;
}

function answer() {
  return getVisibleTrees(readInput());
};

console.log(answer());

const { readInput } = require('./input');

function calculateVisibilityScore(row, col, trees) {
  let tree = trees[row][col];

  let leftTrees = trees[row].slice(0, col);
  let rightTrees = trees[row].slice(col + 1);
  let upTrees = [...Array(row)].map((item, index) => trees[index][col]);
  let downTrees = [...Array(trees.length - row - 1)].map((item, index) => trees[index + row + 1][col]);

  let leftVisibility = 0, rightVisibility = 0, upVisibility = 0, downVisibility = 0;

  for (let column = leftTrees.length - 1; column >= 0; column--){
    leftVisibility++;
    if (leftTrees[column] >= tree) {
      break;
    }
  }

  for (let column = 0; column <= rightTrees.length - 1; column++){
    rightVisibility++;
    if (rightTrees[column] >= tree) {
      break;
    } 
  }

  for (let r = upTrees.length - 1; r >= 0; r--){
    upVisibility++;
    if (upTrees[r] >= tree) {
      break;
    }
  }
  
  for (let r = 0; r <= downTrees.length - 1; r++){
    downVisibility++;
    if (downTrees[r] >= tree) {
      break;
    }
  }

  // console.log(`tree: ${tree}, row: ${row}, col: ${col}, left-visibility: ${leftVisibility}, right-visibility: ${rightVisibility}, up-visibility: ${upVisibility}, down-visibility: ${downVisibility}, total: ${upVisibility * downVisibility * leftVisibility * rightVisibility}`);

  // console.log(`------- row: ${row}, col: ${col}, tree: ${trees[row][col]} -----------`)
  // console.log(`left: ${leftTrees}`);
  // console.log(`right: ${rightTrees}`);
  // console.log(`up: ${upTrees}`);
  // console.log(`down: ${downTrees}`);
  // console.log(`----------------------------------------------------------------------`);

  return downVisibility * upVisibility * leftVisibility * rightVisibility;
  // return upVisible || downVisible || leftVisible || rightVisible;
}

function getVisibleTrees(trees) {
  let visibleCount = (trees.length * 2) - 4 + (trees[0].length * 2);

  let maxVisibility = 1;
  for (let row = 1; row <= trees.length - 2; row++) {
    for (let col = 1; col <= trees[row].length - 2; col++) {
      const visibility = calculateVisibilityScore(row, col, trees);

      if (visibility > maxVisibility) {
        maxVisibility = visibility;
      }
    }
  }
  // for (let ring = 0; ring < Math.ceil(trees.length / 2); ring++) {
  //   // top row
  //   for (let i = ring; i < trees[ring].length - ring; i++) {
  //     visibleCount += determineVisibility(ring, i, trees, treeMapping) ? 1 : 0;
  //     // console.log(trees[ring][i]);
  //   }

  //   // right column
  //   for (let i = ring + 1; i < trees.length - ring; i++) {
  //     visibleCount += determineVisibility(i, trees[ring].length - ring - 1, trees, treeMapping) ? 1 : 0;
  //     // console.log(trees[i][trees[ring].length - ring - 1]);
  //   }

  //   // bottom row
  //   for (let i = trees[ring].length - ring - 2; i >= ring; i--) {
  //     visibleCount += determineVisibility(trees[ring].length - ring - 1, i, trees, treeMapping) ? 1 : 0;
  //     // console.log(trees[trees.length - ring - 1][i]);
  //   }

  //   // left column
  //   for (let i = trees.length - ring - 2; i > ring; i--) {
  //     visibleCount += determineVisibility(i, ring, trees, treeMapping) ? 1 : 0;
  //     // console.log(trees[i][ring]);
  //   }
  // }
  return maxVisibility;
}

function answer() {
  return getVisibleTrees(readInput());
};

console.log(answer());

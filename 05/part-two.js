const fs = require('fs');
const path = require('path');

function readInput() {
  return fs.readFileSync(path.join(__dirname, 'puzzle-05-input.txt'), 'utf8')
    .toString()
    .split('\n\n');
}

function parseStacks(rawStacks) {
  let lines = rawStacks.split('\n');
  lines.pop();
  let stackWidth = '[X]'.length;
  let stacks = [];

  for (line of lines) {
    // console.log(line)
    let stackIndex = 0;
    for (let i = 0; i <= line.length; i += (stackWidth + 1)) {
      const letter = line.slice(i + 1, i + 2).trim();
      
      // console.log(`i: ${i}, line: ${letter}, stack: ${stackIndex}`);

      if (letter) {
        if (stacks[stackIndex]) {
          stacks[stackIndex].unshift(letter);
        } else {
          stacks[stackIndex] = [letter];
        }
      }
      
      stackIndex += 1;
    }
  }

  return stacks;
}

function parseMoves(rawMoves) {
  const lines = rawMoves.split('\n');
  const moves = [];
  
  for (line of lines) {
    let matches = line.matchAll(/^move (\d+) from (\d+) to (\d+)$/g);

    for (const match of matches) {
      moves.push({
        amount: parseInt(match[1], 10),
        from: parseInt(match[2], 10),
        to: parseInt(match[3], 10)
      });
    }
  }

  return moves;
}

function executeMoves(stacks, moves) {
  for (move of moves) {
    // console.log(move);
    stacks[move.to - 1].push(...stacks[move.from - 1].splice(stacks[move.from - 1].length - move.amount));
    // console.log(stacks)
  }

  return stacks;
}

function getTopOfStacks(stacks) {
  let result = '';
  for (stack of stacks) {
    if (stack.length > 0) {
      result = result.concat(stack[stack.length - 1]);
    }
  }

  return result;
}

function answer() {
  const [rawStacks, rawMoves] = readInput();
  console.log(rawStacks);
  
  // console.log(rawStacks.split('\n')[0].length)
  let stacks = parseStacks(rawStacks);
  const moves = parseMoves(rawMoves);
  stacks = executeMoves(stacks, moves);
  console.log(stacks);
  return getTopOfStacks(stacks);
}

console.log(answer());

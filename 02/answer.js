const fs = require('fs/promises');
/**
 * A for Rock, B for Paper, and C for Scissors
 * X for Rock, Y for Paper, and Z for Scissors
 * 
 * (1 for Rock, 2 for Paper, and 3 for Scissors)
 * (0 if you lost, 3 if the round was a draw, and 6 if you won)
 * 
 * -- part 2
 * X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
 */
 async function readGames(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return data.split(/\r?\n/).filter(Boolean).map(game => game.split(' '))
  } catch (err) {
    console.error(err);
  }
}

// const pointMapping = {
//   'X': { // rock
//     points: 1,
//     'A': 3, // rock
//     'B': 0, // paper
//     'C': 6  // scissor
//   },
//   'Y': {  // paper
//     points: 2,
//     'A': 6, // rock
//     'B': 3, // paper
//     'C': 0  // scissor
//   },
//   'Z': {  // scissor
//     points: 3,
//     'A': 0, // rock
//     'B': 6, // paper
//     'C': 3  // scissor
//   },
// }
const pointMapping = {
  'X': { // lose
    points: 0,
    'A': 3, // rock
    'B': 1, // paper
    'C': 2  // scissor
  },
  'Y': {  // draw
    points: 3,
    'A': 1, // rock
    'B': 2, // paper
    'C': 3  // scissor
  },
  'Z': {  // win
    points: 6,
    'A': 2, // rock -> paper
    'B': 3, // paper -> scissor
    'C': 1  // scissor
  },
}

const nameMap = {
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissor',
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissor',
}

function calculateGame(game) {
  let elfsChoice, myChoice;
  [elfsChoice, myChoice] = game;
  // console.log(`${nameMap[elfsChoice]}, ${nameMap[myChoice]}: ${nameMap[myChoice]} - ${pointMapping[myChoice].points}, result: ${pointMapping[myChoice][elfsChoice]}, total: ${pointMapping[myChoice][elfsChoice] + pointMapping[myChoice].points}`);
  const mapping = pointMapping[myChoice];
  return mapping.points + mapping[elfsChoice];
}

const FILE_PATH = './puzzle-02-input.txt';

async function answer() {
  const games = await readGames(FILE_PATH);
  console.log(games.length);
  console.log(games.map(game => calculateGame(game)).reduce((total, val) => total + val, 0));
}

answer();

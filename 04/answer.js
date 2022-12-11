const fs = require('fs/promises');
const { exit } = require('process');
const FILE_PATH = './puzzle-04-input.txt';

async function getPairs(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return data.split(/[\n,]/).filter(Boolean).map(pair => pair.split('-').map(num => parseInt(num,10))).reduce((pairs, pair, index) => {
      if (index % 2 == 0) {
        pairs.push([pair]);
      } else {
        pairs[pairs.length - 1].push(pair);
      }
      
      return pairs;
    }, []);
  } catch (err) {
    console.error(err);
    exit(-1);
  }
}

function determineEncapsulation(pair) {
  const [pairOne, pairTwo] = pair;

  // const pairString = `${pairOne} -- ${pairTwo}`;
  if (pairOne[0] === 16 && pairOne[1] == 87) {
    console.log('test')
  }
  if ((pairOne[0] <= pairTwo[0] && pairOne[1] >= pairTwo[1]) || (pairTwo[0] <= pairOne[0] && pairTwo[1] >= pairOne[1])) {
    // console.log(`${pairString}: true`);
    return true;
  }

    // console.log(`${pairString}: false`);
  return false;
}

function findOverlaps(pair) {
  const [pairOne, pairTwo] = pair;

  // const pairString = `${pairOne} -- ${pairTwo}`;
  // start is in between the start and enf of the other one or the end is
  if ((pairOne[0] <= pairTwo[1] && pairOne[0] >= pairTwo[0]) || (pairOne[1] >= pairTwo[0] && pairOne[1] <= pairTwo[1]) ||
  (pairTwo[0] <= pairOne[1] && pairTwo[0] >= pairOne[0]) || (pairTwo[1] >= pairOne[0] && pairTwo[1] <= pairOne[1])) {
    // console.log(`${pairString}: true`);
    return 1;
  }
  // console.log(pair)
  // console.log(`start is less than the end of pair two: ${pairOne[0] <= pairTwo[1]}`);
  // console.log(`start is greater than the start of pair two: ${pairOne[0] >= pairTwo[0]}`);

  // console.log(`end is greater than the start of pair two: ${pairOne[1] >= pairTwo[0]}`);
  // console.log(`end of pair one is les than the end of pair two: ${pairOne[1] <= pairTwo[1]}`);
    // console.log(`${pairString}: false`);
  return 0;
}

// function determineEncapsulation(pairOne, pair)

async function answer() {
  const pairs = await getPairs(FILE_PATH);
  // console.log(pairs)
  const total = pairs.reduce((total, pair) => {
    // console.log(pair);
    return total + findOverlaps(pair);
  }, 0);
  console.log(total);
  // console.log(pairs.reduce((total, pair) => total + (determineEncapsulation(pair) ? 1 : 0), 0));
}

answer();

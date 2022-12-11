const fs = require('fs/promises');
const { exit } = require('process');
let priorities = {};
const FILE_PATH = './puzzle-03-input.txt';

async function getRucksacks(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    return data.split(/\r?\n/).filter(Boolean).reduce((groupings, rucksack, index) => {
      if (index % 3 === 0 || index === 0) {
        // add new group
        groupings.push([rucksack]);
      } else {
        // append to current group
        groupings[groupings.length - 1].push(rucksack);
      }
      return groupings;
    }, []);
  } catch (err) {
    console.error(err);
  }
}

function generatePriorities() {
  let keys = 'abcdefghijklmnopqrstuvwxyz';
  keys = keys.concat(keys.toUpperCase());

  [...keys].forEach((key, index) => priorities[key] = index + 1);
}

function findDuplicateValue(parts) {
  const [partOne, partTwo] = parts
  if (partOne.length !== partTwo.length) {
    console.log('does not match');
    exit(-1);
  }

  let commonLetters = new Set();
  for (let i = 0; i <= partOne.length - 1; i++) {
    if (partTwo.indexOf(partOne[i]) !== -1) {
      // return priorities[partOne[i]];
      commonLetters.add(partOne[i]);
    }
  }


  if (Array.from(commonLetters).length === 0) {
    console.log(partOne + ' --- ' + partTwo)
  }
  
  return Array.from(commonLetters).reduce((total, val) => total + priorities[val], 0);
}

function findItemType(rucksacks) {
  rucksacks.sort((a, b) => b.length - a.length);
  const [first, second, third] = rucksacks;

  for (let i = 0; i <= first.length - 1; i++) {
    if ((second && second.indexOf(first[i]) !== -1) && ((third && third.indexOf(first[i]) !== -1) || !third)) {
      return priorities[first[i]];
    }
  }
}

async function answer() {
  generatePriorities();
  // console.log(priorities);
  const rucksacks = await getRucksacks(FILE_PATH);
  console.log(rucksacks.reduce((total, grouping) => total + findItemType(grouping), 0))
  // console.log(rucksacks.map(rucksack => findDuplicateValue(rucksack)).filter(Boolean).reduce((total, val) => total + val, 0));
}

answer();

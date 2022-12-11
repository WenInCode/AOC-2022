const fs = require('fs/promises');

async function getFileData(filePath) {
  try {
    return fs.readFile(filePath, { encoding: 'utf-8' });
  } catch (err) {
    console.error(err);
  }
}

function getMaxCalories(fileData) {
  let max = [0];
  const elves = fileData.split(/\r?\n/).reduce((acc, current) => {
    if (acc.length == 0) {
      acc = [parseInt(current, 10)];
    } else if (current) {
      acc[acc.length - 1] = acc[acc.length - 1] + parseInt(current, 10);
    } else {
      acc.push(0);
    }

    if (max.length < 3) {
      max.push(acc[acc.length - 1]);
    } else if (acc[acc.length - 1] > max[max.length - 1]) {
      max[max.length -1] = acc[acc.length -1];
    }
    max.sort((a, b) => b - a);

    return acc;
  }, []);

  return max.reduce((total, val) => total + val, 0);
}

async function answer() {
  const FILE_PATH = './puzzle-01-input.txt';
  const data = await getFileData(FILE_PATH);

  if (data) {
    return getMaxCalories(data);
  }
  
  return 0;
}

answer().then(resp => console.log(resp));

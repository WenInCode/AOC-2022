const { FileSystem } = require('./filesystem');
const { readInput } = require('./input');

function answer() {
  const data = readInput();
  const customFS = new FileSystem(data);
  return [...customFS].filter(item => item.isDir && item.size <= 100000).reduce((total, item) => total + item.size, 0);
}

console.log(answer());

const { FileSystem } = require('./filesystem');
const { readInput } = require('./input');

function answer() {
  const data = readInput();
  const customFS = new FileSystem(data);
  const spaceRequired = customFS.rootDir.size - 40000000;
  const sortedDirectories = [...customFS].filter(item => item.isDir).sort((a, b) => a.size - b.size);

  for (let dir of sortedDirectories) {
    if (dir.size >= spaceRequired) {
      return dir.size;
    } 
  }
}

console.log(answer());

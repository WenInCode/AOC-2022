class File {
  size = 0;
  isDir = false;
  name;
  parentDir;

  constructor(name, size, parentDir) {
    this.name = name;
    this.size = size
    this.parentDir = parentDir;
  }
}

class Dir {
  contents = [];
  isDir = true;
  name;
  parentDir;

  constructor(name, parentDir) {
    this.name = name;
    this.parentDir = parentDir;
  }

  addDirectory(directory) {
    this.contents.push(directory);
  }

  // compute size of all it's contents
  get size() {
    return this.contents.reduce((total, item) => total + item.size, 0);
  }
}

class FileSystem {
  rootDir;

  constructor(instructions) {
    this.rootDir = new Dir('/');
    this.build(instructions);
  }

  // parse instructions to build out file system
  build(instructions) {
    let currentDir = this.rootDir;
    for (let instruction of instructions) {
      let parts = instruction.split(' ');
      if (parts[0] === '$' && parts[1] === 'cd') {
        if (parts[2] === this.rootDir.name) {
          currentDir = this.rootDir;
        } else if (parts[2] === '..') {
          currentDir = currentDir.name === this.rootDir.name ? this.rootDir : currentDir.parentDir;
        } else {
          const foundDir = currentDir.contents.find(item => item.isDir && item.name === parts[2]);

          if (foundDir) {
            currentDir = foundDir;
          } else {
            const newDir = new Dir(parts[2], currentDir);
            currentDir.addDirectory(newDir);
            currentDir = newDir;
          }
        }
      } else if (parts[0] === '$' && parts[1] === 'ls') {
        continue
      } else if (parts[0] === 'dir') {
        const foundDir = currentDir.contents.find(item => item.isDir && item.name === parts[1]);

        if (!foundDir) {
          const newDir = new Dir(parts[1], currentDir);
          currentDir.addDirectory(newDir);
        }
      } else {
        let file = new File(parts[1], parseInt(parts[0], 10), currentDir);
        currentDir.addDirectory(file);
      }
    }
  }

  static *walk(directory) {
    for (let item of directory.contents) {
      yield item;
      if (item.isDir) {
        yield* FileSystem.walk(item);
      }
    }
  } 

  *[Symbol.iterator]() {
    yield* FileSystem.walk(this.rootDir);
  }
}

module.exports = {
  FileSystem 
};

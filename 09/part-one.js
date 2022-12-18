const { readMoves } = require('./input');

function applyStep(item, direction) {
  item.history.push(`${item.x}:${item.y}`);

  switch(direction) {
    case 'R':
      item.x += 1
      break;
    case 'L':
      item.x -= 1
      break;
    case 'U':
      item.y += 1
      break;
    case 'D':
      item.y -= 1
      break;
  }

  return item;
}

function isTouching(head, tail) {
  let yDiff = Math.abs(head.y - tail.y);
  let xDiff = Math.abs(head.x - tail.x);

  return xDiff <= 1 && yDiff <= 1;
}

function moveToLastHead(head, tail) {
  let lastHeadKey = head.history[head.history.length - 1];
  let lastHead = lastHeadKey.split(':').map(coord => parseInt(coord, 10));

  tail.x = lastHead[0];
  tail.y = lastHead[1];
  tail.history.push(`${tail.x}:${tail.y}`);

  return tail;
}


function applyMove(head, tail, step) {
  for (let i = 0; i < step.amount; i++) {
    head = applyStep(head, step.direction);
   
    if (!isTouching(head, tail)) {
      tail = moveToLastHead(head, tail);
    }
  }

  return [head, tail];
}

function answer() {
  const steps = readMoves('puzzle-09-input.txt'); 

  let head = { x: 0, y: 0, history: [] };
  let tail = { x: 0, y: 0, history: ['0:0'] };

  for (let step of steps) {
    [head, tail] = applyMove(head, tail, step);
  }

  return Array.from(new Set(tail.history)).length;
}

console.log(answer());

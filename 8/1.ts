import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

enum VISIBILITY {
  "UNVISITED",
  "VISIBLE",
  "INVISIBLE"
}
type TREE = {
  height: number
  visible: VISIBILITY
}

// parse map
const mapArr: TREE[][] = [];
for (let i = 0; i < lines.length; i++) {
  const lineArr: TREE[] = [];
  const currLine = lines[i].split("");
  for (let j = 0; j < currLine.length; j++) {
    const currNum = parseInt(currLine[j]);
    lineArr.push({
      height: currNum,
      visible: (i === 0 || j === 0) ? VISIBILITY.VISIBLE : VISIBILITY.UNVISITED
    });
  }
  mapArr.push(lineArr);
}

let lastTreeHeight = -1;

// L->R (U->D)
for (let i = 0; i < mapArr.length; i++) {
  let currLine = mapArr[i];
  lastTreeHeight = currLine[0].height;
  currLine[0].visible = VISIBILITY.VISIBLE;
  for (let j = 1; j < currLine.length; j++) {
    const currTree = currLine[j];
    if (lastTreeHeight >= currTree.height) continue;
    currTree.visible = VISIBILITY.VISIBLE;
    lastTreeHeight = currTree.height;

  }
}

// R->L (U->D)
for (let i = 0; i < mapArr.length; i++) {
  let currLine = mapArr[i];
  lastTreeHeight = currLine[currLine.length - 1].height;
  currLine[currLine.length - 1].visible = VISIBILITY.VISIBLE;
  for (let j = currLine.length - 2; j >= 0; j--) {
    const currTree = currLine[j];
    if (lastTreeHeight >= currTree.height) continue;
    currTree.visible = VISIBILITY.VISIBLE;
    lastTreeHeight = currTree.height;
  }
}

// U->D (L->R)
for (let j = 0; j < mapArr[0].length; j++) {
  lastTreeHeight = mapArr[0][j].height;
  mapArr[0][j].visible = VISIBILITY.VISIBLE;
  for (let i = 1; i < mapArr.length; i++) {
    const currTree = mapArr[i][j];
    if (lastTreeHeight >= currTree.height) continue;
    currTree.visible = VISIBILITY.VISIBLE;
    lastTreeHeight = currTree.height;

  }
}

for (let j = mapArr[0].length - 1; j >= 0; j--) {
  lastTreeHeight = mapArr[mapArr.length - 1][j].height;
  mapArr[mapArr.length - 1][j].visible = VISIBILITY.VISIBLE;
  for (let i = mapArr.length - 2; i >= 0; i--) {
    const currTree = mapArr[i][j];
    if (lastTreeHeight >= currTree.height) continue;
    currTree.visible = VISIBILITY.VISIBLE;
    lastTreeHeight = currTree.height;

  }
}


let sum = 0;
for (let i = 0; i < mapArr.length; i++) {
  const currLine = mapArr[i];
  for (let j = 0; j < currLine.length; j++) {
    const currTree = currLine[j];
    if (currTree.visible === VISIBILITY.VISIBLE) sum++;
  }
}

console.log(sum);
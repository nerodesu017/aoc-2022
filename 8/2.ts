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

function calcScenicScore(x: number, y: number) {
  let UP = 0, DOWN = 0, LEFT = 0, RIGHT = 0;
  const X = x, Y = y;
  const height = mapArr[X][Y].height;
  while (x-1 >= 0) {
    UP++;
    if (mapArr[x-1][y].height >= height) break;
    x--;
  }
  x = X;
  while (x+1 < mapArr.length) {
    DOWN++;
    if (mapArr[x+1][y].height >= height) break;
    x++;
  }
  x = X;
  while (y-1 >= 0) {
    LEFT++;
    if (mapArr[x][y-1].height >= height) break;
    y--;
  }
  y = Y;
  while (y+1 < mapArr[0].length) {
    RIGHT++;
    if (mapArr[x][y+1].height >= height) break;
    y++;
  }
  y = Y;
  return UP * DOWN * LEFT * RIGHT;
}

let highestScenicScore = -1;
for (let i = 0; i < mapArr.length; i++) {
  for(let j = 0; j < mapArr[i].length; j++){
    let scenicScore = calcScenicScore(i, j);
    if(scenicScore > highestScenicScore)highestScenicScore = scenicScore;
  }
}

console.log(highestScenicScore);
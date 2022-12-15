import * as fs from "fs";

const X_SIZE = 700;
const SUBSTRACT_VALUE = 200;

const file = fs.readFileSync("./test.txt", { encoding: "utf-8" });

const lastYPos = Array.from(new Set(Array.from(file.matchAll(/,[0-9]+/gm)).map(el => el[0]))).map(el => parseInt(el.slice(1))).sort((a, b) => b - a)[0] + 2;

const lines = file.split(/\r?\n/gm);

type Point = {
  x: number,
  y: number
}

class Cave {
  private _pointArr: string[][]
  private _sandParticleIndex: number

  constructor() {
    let arr = new Array(lastYPos + 1); // array with SIZE lines (Y_MAX = SIZE-1)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(X_SIZE); // array with SIZE columns (X_MAX = SIZE-1)
    }
    this._pointArr = arr;

    this._sandParticleIndex = 0;
  }

  displayCave() {
    for (let i = 0; i < this._pointArr.length; i++) {
      let str = "";
      for (let j = 0; j < this._pointArr[i].length; j++) {
        str += this._pointArr[i][j] === undefined ? "." : this._pointArr[i][j];
      }
      console.log(str);
    }
  }

  addRockLine(lastPoint: Point, currPoint: Point) {
    let startX = lastPoint.x < currPoint.x ? lastPoint.x : currPoint.x;
    let startY = lastPoint.y < currPoint.y ? lastPoint.y : currPoint.y;
    let endX = lastPoint.x > currPoint.x ? lastPoint.x : currPoint.x;
    let endY = lastPoint.y > currPoint.y ? lastPoint.y : currPoint.y;

    for (; startX <= endX && startY <= endY;) {
      this._pointArr[startY][startX] = "#";
      if (startX === endX && startY === endY) {
        this._pointArr[startY][startX] = "#";
        break;
      }
      if (startX === endX) startY++;
      if (startY === endY) startX++;
    }
  }

  addRockPath(line: string) {
    let positions = line.split(" -> ").map(position => {
      let [x, y] = position.split(",").map(el => parseInt(el));
      x = x - SUBSTRACT_VALUE;
      return [x, y];
    })

    for (let i = 1; i < positions.length; i++) {
      let [lastX, lastY] = positions[i - 1];
      let [currX, currY] = positions[i];

      this.addRockLine({ x: lastX, y: lastY }, { x: currX, y: currY });
    }
  }

  simulateSandParticle(): boolean {
    this._sandParticleIndex++;
    if(this._sandParticleIndex > 0 && this._sandParticleIndex % 200000 === 0){
      this.displayCave();
      process.exit(0);
    }
    let x = 500 - SUBSTRACT_VALUE;
    let y = 0;
    while (y < lastYPos) {
      switch (this.getPoint(y + 1, x)) {
        case "#":
          if (x > 0 && y < lastYPos && this.getPoint(y + 1, x - 1) === undefined) {
            x--; y++;
          } else if (x < X_SIZE - 1 && y < lastYPos && this.getPoint(y + 1, x + 1) === undefined) {
            x++; y++;
          } else {
            return this.setPoint(y, x, "o");
          }
          break;
        case "o":
          if (x > 0 && y < lastYPos && this.getPoint(y + 1, x - 1) === undefined) {
            x--; y++;
          }
          else if (x < X_SIZE - 1 && y < lastYPos && this.getPoint(y + 1, x + 1) === undefined) {
            x++; y++;
          } else {
            return this.setPoint(y, x, "o");
          }
          break;
        case undefined:
          y++;
          break;
      };
    }
  }

  get sandParticleIndex() {
    return this._sandParticleIndex;
  }

  setPoint(y: number, x: number, value: any): boolean {
    this._pointArr[y][x] = value;
    return x === 500-SUBSTRACT_VALUE && y === 0 ? true : false;
  }

  getPoint(y: number, x: number) {
    return this._pointArr[y][x];
  }
}

let cave = new Cave();
lines.forEach(line => cave.addRockPath(line));
cave.addRockPath(`${0 + SUBSTRACT_VALUE},${lastYPos} -> ${X_SIZE - 1 + SUBSTRACT_VALUE},${lastYPos}`);

let fallIntoAbyss = false;
do {
  fallIntoAbyss = cave.simulateSandParticle();
} while(!fallIntoAbyss)
cave.displayCave();
console.log(cave.sandParticleIndex);



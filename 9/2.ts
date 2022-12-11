import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

class Point {
  private _x: number
  private _y: number
  private _visitedPositions: Set<string>
  private _keepPositions: boolean

  constructor(x: number, y: number, keepPositions: boolean = false) {
    this._x = x;
    this._y = y;
    if (keepPositions) {
      this._keepPositions = true;
      this._visitedPositions = new Set();
      this.addToSet();
    } else {
      this._keepPositions = false;
      this._visitedPositions = null;
    }
  }

  set x(_x: number) {
    this._x = _x;
    this.addToSet();
  }
  set y(_y: number) {
    this._y = _y;
    this.addToSet();
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get visitedPositions() {
    return this._visitedPositions;
  }

  addToSet() {
    if (this._keepPositions) this._visitedPositions.add(`${this._x};${this._y}`);
  }

  closeGap(p: Point) {
    const diffDirection: boolean = p.x !== this.x && p.y !== this.y;
    if (Point.distance(p, this) <= 1) return;
    if (!diffDirection) {
      if (p.x !== this.x) {
        if (p.x < this.x) for (let i = this.x - 1; i > p.x; i--)this.x--;
        if (this.x < p.x) for (let i = p.x - 1; i > this.x; i--)this.x++;
      }
      if (p.y !== this.y) {
        if (p.y < this.y) for (let i = this.y - 1; i > p.y; i--)this.y--;
        if (this.y < p.y) for (let i = p.y - 1; i > this.y; i--)this.y++;
      }
    } else {
      this._x += p.x < this.x ? -1 : 1;
      this._y += p.y < this.y ? -1 : 1;
      this.addToSet();
      this.closeGap(p);
    }
  }

  static distance(p1: Point, p2: Point) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) - (p1.x !== p2.x && p1.y !== p2.y ? 1 : 0);
  }

  static printTrail(point: Point) {
    if (!point._keepPositions) {
      console.log("Point doesn't keep positions!!!");
      return;
    }

    let smallest = Number.MAX_SAFE_INTEGER;
    let biggest = Number.MIN_SAFE_INTEGER;
    let tempArr = Array.from(point.visitedPositions).map(el => el.split(";").map(_el => parseInt(_el)));
    tempArr.forEach(_arr => _arr.forEach(el => smallest = el > smallest ? smallest : el));
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length; j++) {
        tempArr[i][j] = tempArr[i][j] - smallest;
        if (tempArr[i][j] > biggest) biggest = tempArr[i][j];
      }
    }
    biggest++;
    let tempSet = new Set(tempArr.map(el => `${el[0]};${el[1]}`));

    console.log("~".repeat(biggest));
    for (let i = 0; i < biggest; i++) {
      let str = "";
      for (let j = 0; j < biggest ; j++) {
        str += tempSet.has(`${j};${i}`) ? "#" : ".";
      }
      console.log(str);
    }
    console.log("~".repeat(biggest));
  }
}

// Consider HEAD part of TAIL
// HEAD value is = 0

class Tail {
  private parts: Point[]

  constructor() {
    this.parts = [];
    for (let i = 0; i < 10; i++) {
      this.parts.push(new Point(5000, 5000, i === 9 ? true : false));
    }
  }

  move(direction: string, steps: number) {
    const H = this.parts[0];
    for(let i = 0; i < steps; i++){
      switch (direction) {
        case "R":
          H.x += 1;
          break;
        case "L":
          H.x -= 1;
          break;
        case "U":
          H.y -= 1;
          break;
        case "D":
          H.y += 1;
          break;
        default:
          throw new Error("Unknown direction: " + direction);
      }

      for(let i = 1; i < this.parts.length; i++){
        this.parts[i].closeGap(this.parts[i-1]);
      }
    }
  }

  get showTailSet() {
    return this.parts[this.parts.length - 1].visitedPositions;
  }

  get lastPart() {
    return this.parts[this.parts.length - 1];
  }
}

const tail = new Tail();

for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i];
  const split = currLine.split(" ");
  const cardinalPoint = split[0];
  const steps = parseInt(split[1]);

  tail.move(cardinalPoint, steps);
}

Point.printTrail(tail.lastPart);
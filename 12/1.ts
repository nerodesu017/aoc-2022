import * as fs from "fs";
// import * as util from "util";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

enum DIRECTION {
  UP = "^",
  DOWN = "v",
  LEFT = "<",
  RIGHT = ">",
  DEFAULT = ".",
  "^" = UP,
  "v" = DOWN,
  "<" = LEFT,
  ">" = RIGHT,
  "." = DEFAULT
}

type Square = {
  value: string
  direction: DIRECTION
  visited: boolean
  weight: number
}

type Position = {
  column: number,
  line: number
}

let startPos: Position = {
  column: -1,
  line: -1
}

let finalPos: Position = {
  column: -1,
  line: -1
}

let area: Square[][] = [];

// parse area

lines.forEach((line, i) => {
  let currLineArr: Square[] = [];
  line.split("").forEach((char, j) => {
    currLineArr.push({
      direction: DIRECTION.DEFAULT,
      value: char,
      visited: false,
      weight: char === "S" ? 0 : Number.MAX_SAFE_INTEGER
    })

    if (char === "S") {
      startPos.column = j; // j is column
      startPos.line = i; // i is line
    }

    if (char === "E") {
      finalPos.column = j;
      finalPos.line = i;
    }

  })
  area.push(currLineArr);
})

let smallestNumberOfSteps = Number.MAX_SAFE_INTEGER;

function getAdjacentSqrPos(direction: DIRECTION, line: number, col: number): Position | null {
  switch (direction) {
    case DIRECTION.UP:
      return line === 0 ? null : { line: line - 1, column: col };
    case DIRECTION.DOWN:
      return line === area.length - 1 ? null : { line: line + 1, column: col };
    case DIRECTION.LEFT:
      return col === 0 ? null : { line: line, column: col - 1 };
    case DIRECTION.RIGHT:
      return col === area[line].length - 1 ? null : { line: line, column: col + 1 };
    default:
      return null;
  }
}

function traceRecursive(line: number, col: number, prevWeight: number, currSteps: number = 0) {
  const currSqr = area[line][col];
  if (!(prevWeight + 1 < currSqr.weight)) return;
  currSqr.weight = prevWeight + 1;
  if (currSqr.value === "E" && smallestNumberOfSteps > currSteps) { smallestNumberOfSteps = currSteps; return; }
  currSqr.visited = true;
  let currSqrValue: number = currSqr.value === "S" ? "a".charCodeAt(0) : currSqr.value.charCodeAt(0);
  [DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT]
    .map(dir => getAdjacentSqrPos(dir, line, col))
    .forEach(adjacentSqrPos => {
      if (adjacentSqrPos === null) return;
      const adjacentSqr = area[adjacentSqrPos.line][adjacentSqrPos.column];
      if (adjacentSqr.visited === true) return;
      const adjacentSqrValue: number = adjacentSqr.value === "E" ? "z".charCodeAt(0) : adjacentSqr.value.charCodeAt(0);
      if (adjacentSqrValue > currSqrValue + 1) return;

      traceRecursive(adjacentSqrPos.line, adjacentSqrPos.column, currSqr.weight, currSteps + 1);
    });
  currSqr.visited = false;
}

traceRecursive(startPos.line, startPos.column, -2, 0);

console.log(smallestNumberOfSteps);
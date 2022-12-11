import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

type Point = {
  x: number
  y: number
}

const T: Point = {
  x: 1000,
  y: 1000
};

const H: Point = {
  x: 1000,
  y: 1000
}

const visitedPositionsSet: Set<string> = new Set();
addToSet({
  x: T.x,
  y: T.y
});


function distance() {
  return Math.abs(H.x - T.x) + Math.abs(H.y - T.y) - (H.x !== T.x && H.y !== T.y ? 1 : 0);
}

function addToSet(p: Point){
  visitedPositionsSet.add(`${p.x} ${p.y}`);
}

/**
 * @description
 * This function gets the (T)ail closer to the (H)ead and adds this (T)ail's position to the 'visitedPositionsSet' set
 */
function closeGap() {
  const diffDirection: boolean = H.x !== T.x && H.y !== T.y;
  if (distance() <= 1) return;
  if (!diffDirection) {
    if (H.x !== T.x) {
      if (H.x < T.x) {
        for (let i = T.x - 1; i > H.x; i--) {
          addToSet({
            x: i,
            y: T.y
          });
        }
        T.x = H.x + 1;
      } else if (T.x < H.x) {
        for (let i = H.x - 1; i > T.x; i--) {
          addToSet({
            x: i,
            y: T.y
          });
        }
        T.x = H.x - 1;
      }
    } else {
      if (H.y < T.y) {
        for (let i = T.y - 1; i > H.y; i--) {
          addToSet({
            x: T.x,
            y: i
          });
        }
        T.y = H.y + 1;
      } else if (T.y < H.y) {
        for (let i = H.y - 1; i > T.y; i--) {
          addToSet({
            x: T.x,
            y: i
          });
        }
        T.y = H.y - 1;
      }
    }
  } else {
    T.x += H.x < T.x ? -1 : 1;
    T.y += H.y < T.y ? -1 : 1;
    addToSet(T);
    closeGap();
  }
}

for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i];
  const split = currLine.split(" ");
  const cardinalPoint = split[0];
  const steps = parseInt(split[1]);

  switch (cardinalPoint) {
    case "R":
      H.x += steps;
      break;
    case "L":
      H.x -= steps;
      break;
    case "U":
      H.y -= steps;
      break;
    case "D":
      H.y += steps;
      break;
    default:
      throw new Error("????");
  }

  closeGap();
}

console.log(new Set(Array.from(visitedPositionsSet)).size);
// const arr = Array.from(visitedPositionsSet);
// arr.forEach((el, i) => {
//   let ind;
//   if(arr.findIndex((_el, _i) => el === _el && _i !== i) !== -1){
//     console.log(`${i}`);
//   }
// })
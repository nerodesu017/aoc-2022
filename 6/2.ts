import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

let leftSide = 0;
let rightSide = 14;

do {
  let subStr = file.slice(leftSide, rightSide);
  let subIndex = -1;
  for(let i = 1; i < subStr.length; i++){
    let sliced = subStr.slice(0, i);
    let index = sliced.split("").findIndex(el => el === subStr[i]);
    if(index !== -1){
      subIndex = index;
      break;
    }
  }
  if(subIndex === -1)break;
  leftSide += subIndex + 1;
  rightSide += subIndex + 1;
} while (true);

console.log(rightSide);
import { Console } from "console";
import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

interface moveLine {
  howMany: number
  from: number
  to: number
}

function parseLine(line: string): moveLine {
  let [howMany, from, to] = line.slice(5).replace(new RegExp(" ", "gm"), "").replace(/[a-z]+/gm, ",").split(",").map(el => parseInt(el));
  return {
    howMany,
    from,
    to
  }
}

function parseStart(lines: string[]): string[][] {
  /**
   * 
   */

  const COLS = 9;
  const COL_LENGTH = 3;
  const SPACE_LENGTH = 1;

  const cratesArr: string[][] = new Array(10);
  
  for (let i = 0; i < cratesArr.length; i++) {
    cratesArr[i] = [];
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    let currLine = lines[i];
    for (let j = 0; j < COLS; j++) {
      let currChar = currLine[j * (COL_LENGTH + SPACE_LENGTH) + Math.floor(COL_LENGTH / 2)];
      if(!currChar)continue;
      if (!/[A-Za-z]/.test(currChar)) continue;
      cratesArr[j+1].push(currChar);
    }
  }

  return cratesArr;
}

let cratesLines = (() => {
  let temp = [];
  for(let i = 0; i < _lines.length; i++){
    let currLine = _lines[i];
    if(currLine.startsWith("move"))break;
    temp.push(currLine);
  }
  return temp;
})();

let parsedCrates = parseStart(cratesLines);

_lines.forEach((line) => {
  if(!line || !line.startsWith("move"))return;
  let parsedLine = parseLine(line);

  let to = parsedCrates[parsedLine.to];
  let from = parsedCrates[parsedLine.from];
  let howMany = parsedLine.howMany;
  to.push(...from.splice(from.length - howMany, howMany).reverse());
})

let final = "";
parsedCrates.forEach((line, index) => {
  if(index === 0)return;
  final += line[line.length-1];
})
console.log(final);
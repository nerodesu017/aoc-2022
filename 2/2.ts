import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

const mappedCases = {
  "A X": ["lose", 3],
  "A Y": ["draw", 1],
  "A Z": ["win", 2],
  "B X": ["lose", 1],
  "B Y": ["draw", 2],
  "B Z": ["win", 3],
  "C X": ["lose", 2],
  "C Y": ["draw", 3],
  "C Z": ["win", 1],
};

let score = 0;

_lines.forEach((line: string) => {
  // @ts-ignore
  switch (mappedCases[line][0]) {
    case "win":
      score += 6;
      break;
    case "lose":
      break;
    case "draw":
      score += 3
      break;
  }
  // @ts-ignore
  score += mappedCases[line][1];
})

console.log(score);
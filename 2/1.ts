import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

const mappedCases = {
  "A X": "draw",
  "A Y": "win",
  "A Z": "lose",
  "B X": "lose",
  "B Y": "draw",
  "B Z": "win",
  "C X": "win",
  "C Y": "lose",
  "C Z": "draw",
}

let score = 0;

_lines.forEach((line: string) => {
  // @ts-ignore
  switch (mappedCases[line]) {
    case "win":
      score += 6;
      break;
    case "lose":
      break;
    case "draw":
      score += 3
      break;
  }

  switch (line[line.length - 1]) {
    case "X":
      score += 1;
      break;
    case "Y":
      score += 2;
      break;
    case "Z":
      score += 3;
      break;
  }
})

console.log(score);
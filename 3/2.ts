import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

const prioMap: Map<string, number> = new Map("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((el, i) => [el, i + 1]));

let sum = 0;

for (let i = 0; i < _lines.length; i += 3) {
  const l1 = _lines[i];
  const l2 = _lines[i + 1];
  const l3 = _lines[i + 2];

  const tempMap: Map<string, number> = new Map();

  LOOP1: for (let i = 0; i < [l1, l2, l3].length; i++) {
    const currArr = [l1, l2, l3][i];
    const whatToOrItWith = 1 << i;
    for (let char of currArr) {
      // if the first guy don t have it, go on
      if (!tempMap.has(char) && i !== 0) continue;

      // if the first guy has it, set it
      if (!tempMap.has(char) && i === 0) { tempMap.set(char, 0 | whatToOrItWith); continue; }

      // we could make this better, check if i == lastElIndex and then check if tempMap.get(char) === 0b011 
      // basically if we at the last one and previous ones have it (the first 2 have it)
      // then all of em have it
      tempMap.set(char, tempMap.get(char) | whatToOrItWith);

      if(tempMap.get(char) === 0b111){
        sum += prioMap.get(char);
        break LOOP1;
      }
    }
  }
}

console.log(sum);
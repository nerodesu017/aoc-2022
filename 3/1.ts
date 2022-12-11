import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

const prioMap: Map<string, number> = new Map("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((el, i) => [el, i+1]));

let sum = 0;

_lines.forEach(line => {
  let len = line.length;
  let firstCompartment = line.substring(0, len/2);
  let secondCompartment = line.substring(len/2, len);

  let tempMap: Set<string> = new Set();
  for(let char of firstCompartment){
    tempMap.add(char);
  }

  for(let char of secondCompartment){
    if(!tempMap.has(char))continue;
    sum += prioMap.get(char);
    break;
  }
})

console.log(sum);
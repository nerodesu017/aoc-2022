import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

function overlapsAtAll(a1: number, b1: number, 
                      a2: number, b2: number): boolean {
  if(a2 > b1 || a1 > b2)return false;
  return true;
}

let howMany = 0;
// In how many assignment pairs does one range fully contain the other?


let allPairs: number[][] = [];

_lines.forEach(line => {
  let [firstElf, secondElf] = line.split(",");

  let [firstElfA, firstElfB] = firstElf.split("-").map(el => parseInt(el));
  let [secondElfA, secondElfB] = secondElf.split("-").map(el => parseInt(el));

  howMany += overlapsAtAll(firstElfA, firstElfB, secondElfA, secondElfB) ? 1 : 0;
})

console.log(howMany);
import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

function oneContainedInAnother(a1: number, b1: number, a2: number, b2: number): boolean {
  if (a1 < a2 && b1 >= b2) return true;
  else if (a1 > a2 && b2 >= b1) return true;
  else if (a1 === a2) return true;
  return false;
}

let howMany = 0;
// In how many assignment pairs does one range fully contain the other?

_lines.forEach(line => {
  let [firstElf, secondElf] = line.split(",");

  let [firstElfA, firstElfB] = firstElf.split("-").map(el => parseInt(el));
  let [secondElfA, secondElfB] = secondElf.split("-").map(el => parseInt(el));

  if(oneContainedInAnother(firstElfA, firstElfB, secondElfA, secondElfB))howMany++;
})

console.log(howMany);
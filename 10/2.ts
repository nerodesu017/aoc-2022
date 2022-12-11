import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

function incrementCycle() {
  cycle++;
  let temp = cycle % 40;
  if (temp === spritePos ||
    temp === spritePos + 1 ||
    temp === spritePos + 2) {
    screen[cycle - 1] = true;
  }
}

const screen: boolean[] = new Array(40 * 10);
for (let i = 0; i < screen.length; i++) {
  screen[i] = false;
}

function printScreen(screen: boolean[]) {
  for (let i = 0; i < 10; i++) {
    let currLine = screen.slice(i * 40, (i + 1) * 40);
    console.log(currLine.map(el => el === false ? "." : "#").join(""));
    if (currLine.length < 40) break;
  }
  console.log("~".repeat(40));
}

// register
let spritePos = 1;
let cycle = 0;

for (let i = 0; i < lines.length; i++) {
  switch (lines[i].split(" ")[0]) {
    case "addx":
      const number = parseInt(lines[i].split(" ")[1]);
      incrementCycle();
      incrementCycle();
      spritePos += number;
      break;
    case "noop":
      incrementCycle();
      break;
  }
}

printScreen(screen);
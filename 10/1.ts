import * as fs from "fs";

const file = fs.readFileSync("./test.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

function incrementCycle(){
  cycle++;
  if([20, 60, 100, 140, 180, 220].includes(cycle)){
    signalStrength.set(cycle, X * cycle);
  }
}


// register
let X = 1;
let cycle = 0;
let signalStrength: Map<number, number> = new Map();

for(let i = 0; i < lines.length; i++){
  switch(lines[i].split(" ")[0]){
    case "addx":
      const number = parseInt(lines[i].split(" ")[1]);
      incrementCycle();
      incrementCycle();
      X += number;
      break;
    case "noop":
      incrementCycle();
      break;
  }
}

let sum = 0;
signalStrength.forEach((val) => {
  sum += val;
})
console.log(sum);
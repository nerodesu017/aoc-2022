import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const lines = file.split(/\r?\n/gm);

const fileSystem: any = {
  type: "dir",
  parent: null
};
Object.defineProperties(fileSystem, {
  type: {
    enumerable: false,
  },
  parent: {
    enumerable: false,
  },
});
let pointer = fileSystem;

// parse everything into the fileSystem object
FORLOOP: for (let i = 0; i < lines.length;) {
  let line = lines[i];
  if (line.startsWith("$")) {
    const split = line.slice(2).split(" ");
    const command = split[0];
    switch (command) {
      case "cd":
        switch (split[1]) {
          case "..":
            pointer = pointer.parent;
            break;
          case "/":
            pointer = fileSystem;
            break;
          default:
            pointer = pointer[split[1]];
            break;
        }
        break;
      case "ls":
        let indexForLs = i + 1;
        if (indexForLs >= lines.length) break;
        let currLsLine = lines[indexForLs];
        while (!currLsLine.startsWith("$")) {
          const split = currLsLine.split(" ");
          switch (split[0]) {
            case "dir":
              pointer[split[1]] = {
                type: "dir",
                parent: pointer
              };
              break;
            default:
              pointer[split[1]] = {
                type: "file",
                size: parseInt(split[0]),
                parent: pointer
              };
              break;
          }
          Object.defineProperties(pointer[split[1]],
            {
              parent: {
                enumerable: false
              },
              type: {
                enumerable: false
              }
            });
          currLsLine = lines[++indexForLs];
          if (currLsLine === undefined || currLsLine === null) break FORLOOP;
        }
        i = --indexForLs;
        continue;
    }
  }
  i++;
}

// find the size of each directory
function calcSumRecursive(obj: any): number{
  let currSum = 0;
  for(let key of Object.keys(obj)){
    if(obj[key].type === "dir"){
      currSum += calcSumRecursive(obj[key]);
    } else {
      currSum += obj[key].size;
    }
  }
  obj.size = currSum;
  return currSum;
}
calcSumRecursive(fileSystem);

// get all directories' size
type sizeAndDir = {
  size: number
  dirName: string
};
const sizesOfDirs: sizeAndDir[] = [];
function getDirsSizeRecursive(obj: any, thisPath: string){
  for(let key of Object.keys(obj)){
    if(typeof obj[key] !== "object")continue;
    getDirsSizeRecursive(obj[key], thisPath + "/" + key);
  }
  if(obj.type === "dir"){
    sizesOfDirs.push({
      dirName: thisPath,
      size: obj.size
    })
  }
}
getDirsSizeRecursive(fileSystem, "");

sizesOfDirs.sort((a, b) => {
  return a.size-b.size;
})

const MAXSIZE = 70000000;
const FREE_SPACE = MAXSIZE - fileSystem.size;
const MIN_UNUSED_SPACE = 30000000;
const MIN_NEEDED_SPACE_TO_FREE = MIN_UNUSED_SPACE - FREE_SPACE;

console.log(sizesOfDirs[sizesOfDirs.findIndex(el => {
  return MIN_NEEDED_SPACE_TO_FREE <= el.size;
})].size);
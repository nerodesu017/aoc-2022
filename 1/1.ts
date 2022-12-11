import * as fs from "fs";

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const _lines = file.split(/\r?\n/gm);

const eachElf = (() => {
  let i = 0;
  let _eachElf: number[] = [0];
  for (let j = 0; j < _lines.length; j++) {
    if (_lines[j] === "") {
      _eachElf.push(0);
      i++;
      continue;
    }
    _eachElf[i] = _eachElf[i] + parseInt(_lines[j]);
  }
  return _eachElf;
})();

const mostCaloriesElf = ((eachElf) => {
  let _mostCaloriesElf = eachElf[0];
  for (let i = 1; i < eachElf.length; i++) {
    if(eachElf[i] > _mostCaloriesElf)_mostCaloriesElf = eachElf[i];
  }
  return _mostCaloriesElf;
})(eachElf)

console.log(mostCaloriesElf);
import * as fs from "fs";
import * as util from "util";

console.debug = () => { };

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" }) + "\n\n[[2]]\n[[6]]";

const lines = file.split(/\r?\n/gm);

let product = 1;

class List {
  private _values: (List | number)[]

  constructor(els?: (List | number)[]) {
    this._values = els ? [...els] : [];
  }

  push(val: List | number) {
    this._values.push(val);
  }

  [util.inspect.custom]() {
    return this.compactOutputThisObj();
  }

  private compactOutputThisObj() {
    return List.compactOutput(this);
  }
  private static compactOutput(val: List | number): string {
    return typeof val === "number" ? val.toString() : this.wrapInSqrParantheses(val._values.map(_val => this.compactOutput(_val)).join(","));
  }

  private static wrapInSqrParantheses(str: string): string {
    return `[${str}]`;
  }

  get length() {
    return this._values.length;
  }

  getElement(elIndex: number) {
    return this._values[elIndex];
  }
}

class MyNumber {
  private _value: number

  constructor(val: number) {
    this.value = val;
  }

  add(val: number) {
    this.value += val;
  }

  substract(val: number) {
    this.value -= val;
  }

  multiply(val: number) {
    this.value *= val;
  }

  divide(val: number) {
    this.value /= val;
  }

  get value() {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
  }
}

function parse(line: String, index: MyNumber = new MyNumber(0)) {
  if (line[index.value] === "[") index.add(1);
  let list = new List();
  let number = "";
  for (; index.value < line.length; index.value++) {
    const char = line[index.value];
    switch (char) {
      case "[":
        list.push(parse(line, index));
        break;
      case "]":
        if (number !== "") list.push(parseInt(number));
        return list;
      case ",":
        if (number !== "") list.push(parseInt(number));
        number = "";
        break;
      default:
        number += char;
        break;
    }
  }
}

const spaceLength = 2;

function compare(l1: List, l2: List, depth: number = 0): boolean | null {
  let isLeftSideSmaller: boolean | null = null;
  let minLen = l1.length < l2.length ? l1.length : l2.length;

  console.debug(`${" ".repeat(depth)}- Compare ${util.inspect(l1)} vs ${util.inspect(l2)}`);

  for (let i = 0; i < minLen; i++) {
    let currElL1 = l1.getElement(i);
    let currElL2 = l2.getElement(i);

    console.debug(`${" ".repeat(depth + spaceLength)}- Compare ${typeof currElL1 === "number" ? currElL1 : util.inspect(currElL1)} vs ${typeof currElL2 === "number" ? currElL2 : util.inspect(currElL2)}`);

    if (currElL1 instanceof List || currElL2 instanceof List) {
      if (!(currElL1 instanceof List)) console.debug(`${" ".repeat(depth + 2 * spaceLength)}- Mixed types; convert left to [${currElL1}] and retry comparison`);
      if (!(currElL2 instanceof List)) console.debug(`${" ".repeat(depth + 2 * spaceLength)}- Mixed types; convert left to [${currElL2}] and retry comparison`);
      isLeftSideSmaller = compare(
        currElL1 instanceof List ? currElL1 : parse(`[${currElL1}]`),
        currElL2 instanceof List ? currElL2 : parse(`[${currElL2}]`),
        depth + spaceLength);
      if (isLeftSideSmaller !== null) return isLeftSideSmaller;
    } else {
      if (currElL1 < currElL2) {
        console.debug(`${" ".repeat(depth + spaceLength)}- Left side is smaller, so inputs are in the right order`);
        return true;
      }
      if (currElL1 > currElL2) {
        console.debug(`${" ".repeat(depth + spaceLength)}- Right side is smaller, so inputs are NOT in the right order`);
        return false;
      }
    }
  }

  if (l1.length < l2.length) {
    console.debug(`${" ".repeat(depth + spaceLength)}- Left side ran out of items, so inputs are in the right order`)
    return true;
  } else if (l1.length > l2.length) {
    console.debug(`${" ".repeat(depth + spaceLength)}- Right side ran out of items, so inputs are not in the right order`)
    return false;
  } else return isLeftSideSmaller;
}

let packets: List[] = [];

lines.forEach(line => {
  line.startsWith("[") ? packets.push(parse(line)) : null;
})

packets.sort((a, b) => compare(a, b) ? -1 : 0);

packets.forEach((packet, index) => {
  if(["[[2]]", "[[6]]"].includes(util.inspect(packet)))product *= index+1;
})

console.log(product);
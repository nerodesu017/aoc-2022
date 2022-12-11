import * as fs from "fs";
import * as util from "util";

console.debug = () => {};

const file = fs.readFileSync("./input.txt", { encoding: "utf-8" });

const monkeysStrings = file.split(/\r?\n\r?\n/gm);

enum OPERATORS {
  MULTIPLY = "*",
  DIVIDE = "/",
  SUBSTRACT = "-",
  ADD = "+",
  "*" = MULTIPLY,
  "/" = DIVIDE,
  "-" = SUBSTRACT,
  "+" = ADD
}

type Operation = {
  // new = old OPERATOR RIGHTSIDE
  operator: OPERATORS,
  right: string | number
}

type Test = {
  divisibleby: number,
  true: number,
  false: number
}

const add = (a: number, b: number) => a + b;
const substract = (a: number, b: number) => a - b;
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number) => a / b;

class Monkey {
  private _id: number
  private _items: number[]
  private _operation: Operation
  private _test: Test
  private _noOfItemsInspected: number
  private static monkeys: Map<number, Monkey>

  constructor(description: string) {
    if (Monkey.monkeys === null || Monkey.monkeys === undefined) Monkey.monkeys = new Map();
    let [monkeyNoLine, startingItemsLine, operationLine, divisibleByLine, trueLine, falseLine] = description.split(/\r?\n/gm);
    const monkeyNo = parseInt(monkeyNoLine.split(" ")[1].slice(0, -1));
    const startingItems = startingItemsLine.split(": ")[1].split(", ").map(el => parseInt(el.trim()));
    // @ts-ignore
    const operator: OPERATORS = OPERATORS[operationLine.split("new = old ")[1].slice(0, 1)];
    const rightSide = operationLine.split("new = old ")[1].slice(2).trim();
    const divisibleBy = parseInt(divisibleByLine.split("divisible by ")[1]);
    const ifTrue = parseInt(trueLine.split(" monkey ")[1]);
    const ifFalse = parseInt(falseLine.split(" monkey ")[1]);
    this._id = monkeyNo;
    this._items = startingItems;
    this._operation = {
      operator: operator,
      right: rightSide === "old" ? "old" : parseInt(rightSide)
    }
    this._test = {
      divisibleby: divisibleBy,
      true: ifTrue,
      false: ifFalse
    }
    this._noOfItemsInspected = 0;
    Monkey.monkeys.set(this._id, this);
  }

  testFirstItemFromList() {
    const item = this._items.shift();
    console.debug(`Inspecting item: ${item} from Monkey: ${this._id}`);
    const worryLevel = Math.floor(this.getNewWorryLevel(item) / 3);
    console.debug(`Item: ${item} has final worry level: ${worryLevel}`);
    let monkeyToBeThrownTo;
    if(worryLevel % this._test.divisibleby === 0){
      console.debug(`Item: ${item} with worry level: ${worryLevel} is divisible by ${this._test.divisibleby}`);
      monkeyToBeThrownTo = this._test.true;
    } else {
      console.debug(`Item: ${item} with worry level: ${worryLevel} is NOT divisible by ${this._test.divisibleby}`);
      monkeyToBeThrownTo = this._test.false;
    }
    console.debug(`Throwing item: ${item} with worry level: ${worryLevel} to Monkey: ${monkeyToBeThrownTo}`);
    Monkey.monkeys.get(monkeyToBeThrownTo).pushItem(worryLevel);
    this._noOfItemsInspected++;
  }

  testItemsFromList() {
    let length = this._items.length;
    for (let i = 0; i < length; i++)this.testFirstItemFromList();
  }

  pushItem(item: number) {
    this._items.push(item);
  }

  getNewWorryLevel(item: number) {
    let operationFunction: Function;
    let rightSide: number;
    switch (this._operation.operator) {
      case OPERATORS.ADD: operationFunction = add; break;
      case OPERATORS.SUBSTRACT: operationFunction = substract; break;
      case OPERATORS.MULTIPLY: operationFunction = multiply; break;
      case OPERATORS.DIVIDE: operationFunction = divide; break;
      default: throw new Error("UNKNOWN OPERATOR");
    }
    switch (typeof this._operation.right) {
      case "number":
        rightSide = this._operation.right;
        break;
      case "string":
        rightSide = item;
        break;
    }

    return operationFunction(item, rightSide);
  }

  get noOfItemsInspected() {
    return this._noOfItemsInspected;
  }

  [util.inspect.custom](depth: any, opts: any) {
    return "" +
      `Monkey ${this._id}:
    Items:      ${this._items.join(", ")}
    Operation:  new = old ${this._operation.operator} ${this._operation.right}
    Test:       divisible by ${this._test.divisibleby}
      If true:    throw to monkey ${this._test.true}
      If false:   throw to monkey ${this._test.false}
    Number of inspected items: ${this._noOfItemsInspected}
`
  }

  static get allMonkeys() {
    return Monkey.monkeys;
  }

  printWithItems() {
    console.log(`Monkey ${this._id}: ${this._items.join(", ")}`);
  }
}

monkeysStrings.forEach(monkeyDescription => new Monkey(monkeyDescription));

let monkeys = Monkey.allMonkeys;
for (let i = 0; i < 20; i++) {
  monkeys.forEach(monkey => monkey.testItemsFromList());
}

console.log(Array.from(monkeys.values()).map(Monkey => Monkey.noOfItemsInspected).sort((a, b) => b-a).slice(0, 2).reduce((prevVal, currVal) => prevVal *= currVal));
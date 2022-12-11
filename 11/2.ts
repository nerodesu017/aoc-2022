import * as fs from "fs";
import * as util from "util";

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

class Item {
  private _divideBy: Map<number, boolean>
  // private _divideByOrdered: number[]
  private _value: number
  private static _Items: Item[]
  private static _LCM: number // Least Common Multiplier

  constructor(val: number) {
    if (Item._Items === null || Item._Items === undefined) Item._Items = [];
    this._divideBy = new Map();
    this._value = val;
    Item._Items.push(this);
  }

  isDivisibleBy(num: number) {
    if (!this._divideBy.has(num)) throw new Error("UNKNOWN DIVISOR");
    return this._divideBy.get(num);
  }

  modify(operator: OPERATORS, numOrOld: number | string) {
    const num = typeof numOrOld === "string" ? this.value : numOrOld;
    switch (operator) {
      case OPERATORS["+"]:
        this.value = this.value + num;
        break;
      case OPERATORS["-"]:
        this.value = this.value - num;
        break;
      case OPERATORS["*"]:
        this.value = this.value * num;
        break;
      case OPERATORS["/"]:
        this.value = this.value / num;
        break;
    }
  }

  setDivideBy(divideByArr: number[]) {
    // this._divideByOrdered = divideByArr.sort((a, b) => b - a);
    // this._divideByOrdered.forEach(num => this._divideBy.set(num, false));
    divideByArr.forEach(num => this._divideBy.set(num, false));
    this.calculateDivideBy();
  }

  static allDivideBy(divideBy: number[]) {
    if (Item.LCM === null || Item.LCM === undefined) Item._LCM = divideBy.reduce((prev, curr) => prev *= curr); // LCD (Least Common Denominator) is 1 between all DIVISIBLE BY numbers
    Item._Items.forEach(item => item.setDivideBy(divideBy));
  }

  get value() {
    return this._value;
  }

  set value(val: number) {
    this._value = val % Item.LCM;
    this.calculateDivideBy();
  }

  calculateDivideBy() {
    this._divideBy.forEach((_, key) => this._divideBy.set(key, this._value % key === 0 ? true : false));
  }

  [util.inspect.custom](depth: any, opts: any) {
    return "" +
      `Item with value: ${this._value}
  Has divisors: ${Array.from(this._divideBy.entries()).map((val) => val)/* Array.from(this._divideBy.keys()).filter(key => this._divideBy.get(key) === true) */}
`
  }

  static get LCM() {
    return Item._LCM;
  }

  static get Items() {
    return Item._Items;
  }
}

class Monkey {
  private _id: number
  private _items: Item[]
  private _operation: Operation
  private _test: Test
  private _noOfItemsInspected: number
  private static monkeys: Map<number, Monkey>

  constructor(description: string) {
    if (Monkey.monkeys === null || Monkey.monkeys === undefined) Monkey.monkeys = new Map();
    let [monkeyNoLine, startingItemsLine, operationLine, divisibleByLine, trueLine, falseLine] = description.split(/\r?\n/gm);
    const monkeyNo = parseInt(monkeyNoLine.split(" ")[1].slice(0, -1));
    const startingItems = startingItemsLine.split(": ")[1].split(", ").map(el => parseInt(el.trim())).map(num => new Item(num));
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
    item.modify(this._operation.operator, this._operation.right);
    let monkeyToBeThrownTo;
    if (item.isDivisibleBy(this._test.divisibleby)) {
      monkeyToBeThrownTo = this._test.true;
    } else {
      monkeyToBeThrownTo = this._test.false;
    }
    Monkey.monkeys.get(monkeyToBeThrownTo).pushItem(item);
    this._noOfItemsInspected++;
  }

  testItemsFromList() {
    let length = this._items.length;
    for (let i = 0; i < length; i++)this.testFirstItemFromList();
  }

  pushItem(item: Item) {
    this._items.push(item);
  }

  get noOfItemsInspected() {
    return this._noOfItemsInspected;
  }

  [util.inspect.custom](depth: any, opts: any) {
    return "" +
      `Monkey ${this._id}:
    Items:      ${""/* this._items.join(", ") */}
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
    console.log(`Monkey ${this._id}: ${""}`);
  }

  get divisor() {
    return this._test.divisibleby;
  }

  printWithNumberOfItemsInspected() {
    console.log(`Monkey ${this._id} inspected items ${this._noOfItemsInspected.toString().padStart(10, " ")} times`);
  }
}

monkeysStrings.forEach(monkeyDescription => new Monkey(monkeyDescription));

const divisors: Set<number> = new Set();

Monkey.allMonkeys.forEach(monkey => divisors.add(monkey.divisor));
Item.allDivideBy(Array.from(divisors));

let monkeys = Monkey.allMonkeys;
for (let i = 0; i < 10000; i++) {
  monkeys.forEach(monkey => monkey.testItemsFromList());
}
monkeys.forEach(monkey => monkey.printWithNumberOfItemsInspected());

console.log(Array.from(monkeys.values()).map(Monkey => Monkey.noOfItemsInspected).sort((a, b) => b - a).slice(0, 2).reduce((prevVal, currVal) => prevVal *= currVal));
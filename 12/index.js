//#region 

let input = `abccccaaacaccccaaaaacccccccaaccccccccaaaaaaccccccaaaaaccccccccccaaaaaaaaacccccccaaaaaaaaaaaaaaccaaaaaccccccccccccaccacccccccccccccccccccccccccccccccccccccccaaaaaa
abccaacaaaaaccaaaaacccccaaaaaccccccccaaaaaaccccccaaaaaacccccccccaaaaaaaaaaaaacccaaaaaaaaaaaaaaaaaaaaaccccccccccccaaaacccccccccccccccccccccccccccccccccccccccaaaaaa
abccaaaaaaaaccaaaaaacccccaaaaaccccccaaaaaaaacccccaaaaaaccccccccccaaaaaaaaaaaacccaaaaaacaaaaaacaaaaaaaaccccccccccaaaaacccccaccccccccccccccccccaaacccccccccccccaaaaa
abcccaaaaaccccccaaaacccccaaaaacccccaaaaaaaaaaccccaaaaaacccccccccaaaaaaaaaaaaaacaaaaaaaaaaaaaacaaaaaaaaccccccccccaaaaaacccaaacccccccccccccccccaaaccccccccccccccaaaa
abaaacaaaaacccccacccccccaaaaaccccccaaaaaaaaaaccccccaaaccccccccccaaaaaaaaacaaaaaaaaaaaaaaaaaaacccaaacaccaaaccccccaaaaaaaacaaacccccccccccaaccccaaacccccccccccccccaac
abaaacaacaaaaccccccccccccccaaccccccacaaaaacccccaacccccccccccccccaaaacaaaaaaaaaacccaacccaaacaacccaaccccaaaaccccccccaacaaaaaaaaaaccccccccaaaaccaaaccccccccccccccaaac
abaaccaaccaaacacccccccccccccccccccccccaaaacccaaaaaaccaaaccccccccccaacaaaaaaaaaacccaaccccccccccccccccccaaaaccccccccccccaaaaaaaaaccccccciiiiiaaaaacccccccccccccccccc
abaaccccaaaaaaaacccccccccccccccccccccccaaccccaaaaaaccaaaaaccccacccaaccaaacaaaaacccccccccccccccaacccccccaaaccccccccccccccaaaaacccccccciiiiiiiiaaaaaccccccaaaccccccc
abaaacccaaaaaaaacccccccccccccccccccccccccccccaaaaaacaaaaaccccaaaaaaaccaaccaaacccccccaaaaacacccaaccccccccccaacccccccccccaaaaaaccccccciiiiiiiiijjaaaaaccccaaacaccccc
abaaaccccaaaaaaccccccccccccccccccccaaccccccccaaaaaccaaaaacccccaaaaaaaaccccccccccccccaaaaaaaaaaaaccccccccccaaacaaccccccaaaaaaaccccccciiinnnnoijjjjjjjjjjaaaaaaacccc
abccccccccaaaaacccccaacccccccccccaaaacccccccccaaaacccaaaaaccccaaaaaaaaacccccccccccccaaaaaaaaaaaaaaccccccccaaaaaacccaacaaacaaacccccchhinnnnnoojjjjjjjjjkkaaaaaacccc
abcccccccaaaaaacaaacaacccccccccccaaaaaaccccccccccccccaacccccccaaaaaaaaacaaccccccccccaaaaaaaaaaaaaaacccccaaaaaaacccaaaaccccccacaaccchhinnnnnoooojjjjjjkkkkaaaaccccc
abaacccaccaaaccccaaaaaccccccccccccaaaaccccccccccccccccccccccccaaaaaaaacaaaaaaaccccccaaaaaaaaaaaaaaacccccaaaaaaacccaaaaccccaaacaaachhhnnntttuooooooooppkkkaaaaccccc
abaacccaaaaaaaccccaaaaaacccccccccaaaaaccccccccccccccccccccccccaaaaaaacccaaaaacccccccccaaacaaaaaaaaccccccccaaaaacccaaaacccccaaaaacchhhnnnttttuooooooppppkkkaaaccccc
abaacccaaaaaaccccaaaaaaacccccccccaacaaccccccccccccccccccccccaaaccaaaccaaaaaaacccccccccccccaaaaaaaccccccaacaacaaacccccccccccaaaaaahhhhnntttttuuouuuuupppkkkcccccccc
abaaaacaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaacccaaacaaaaaaaaccccccccccccaccaaaccccccaaacaaccccccccccccccaaaaaahhhhnnntttxxxuuuuuuupppkkkcccccccc
abaaaacaaaaaaaaaaacaaacccaaacccccccccccccccccccccacccccccccaaaacccccccaaaaaaaaccccccccccccccccaaacccccaaacaaacccccccccccccaaaaaahhhhmnnttxxxxuuyuuuuuppkkkcccccccc
abaaaccaaaaaaaaccccaaaccccaaaccacccccccccccaaaaaaaaccccccccaaaacccccccccaaacaacccccccccccccccccccccaaaaaaaaaacccccacccccccaacaghhhmmmmtttxxxxxxyyyuupppkkccccccccc
abaaccaaaaaaaccccccccccccaaaaaaaacccccccccccaaaaaaccccccccccccccccccccccaaccccccaacccccccccccccccccaaaaaaaaacccccaaccccccccccagggmmmmttttxxxxxyyyyvvppkkkccccccccc
abaacccaccaaacccccccccccaaaaaaaaccccccccccccaaaaaaccccccccccccccccccccccccccaaacaaaccccccccccccccccccaaaaaccccaaaaacaacccccccgggmmmmttttxxxxxyyyyvvpppiiiccccccccc
SbaaaaaccccaaccccccccccaaaaaaaaacacccccccccaaaaaaaacccccccccccccccaacccccccccaaaaaccccccccccaaaacccccaaaaaacccaaaaaaaaccaaaccgggmmmsssxxxEzzzzyyvvvpppiiiccccccccc
abaaaaaccccccccccccccccaaaaaaaaaaaaaaaaaccaaaaaaaaaacccccccccccaaaaacccccccccaaaaaaaccccccccaaaaaccccaaaaaaaccccaaaaacccaaaaagggmmmsssxxxxxyyyyyyvvqqqiiiccccccccc
abaaaaacccccccccccccccccaaaaaaaacaaaaaacccaaaaaaaaaaccccccccccccaaaaacccccccaaaaaaaacccccccaaaaaaccccaaacaaacccaaaaacccaaaaaagggmmmssswwwwwyyyyyyyvvqqqiiicccccccc
abaaaaccccccccccccccccccccaaaaaaaaaaaaacccacacaaacccccccccccccccaaaaacccccccaaaaaaaacccccccaaaaaaccccacccccccccaacaaaccaaaaaagggmmmsssswwwwyyyyyyyvvvqqiiicccccccc
abaaaaacccccccccccccccccccaacccaaaaaaaaaccccccaaaccccccccccccccaaaaaccccccccaacaaacccccccccaaaaaacccccccccccccccccaaccccaaaaagggmmmmssssswwyywwvvvvvvqqiiicccccccc
abaaaaaccccccccccccccccccaaacccaaaaaaaaaacccccaaaccccccaacccccccccaaccaaccccccaaaacaccccaacccaacccccccccccccccccccccccccaaaaccggglllllssswwwywwwvvvvqqqiiicccccccc
abaccccccccccccccccccccccccccccaaaaaaaaaaccccaaaacccaaaacccccccccccccaaaccccccaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccffffllllsswwwwwwrrqvqqqqiiicccccccc
abccccccccccccccccccccccccccccccccaaacacaccccaaaacccaaaaaacccccccccaaaaaaaaccccaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccfffflllssrwwwwrrrqqqqqqjjicccccccc
abcccccccaaaccccccccaaccccccccccccaaacccccccccaaaccccaaaaacccccccccaaaaaaaaccaaaaaaacaaaaaaacccccccccccccccccccccccccccccccccccccfffflllrrwwwrrrrqqqqjjjjjcccccccc
abaaaccaaaaacccccccaaacaaccccccccccaacccccccccccccccaaaaacccccccccccaaaaaacccaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccffffllrrrrrrrkjjjjjjjjjcccaccccc
abaaaccaaaaaacccccccaaaaacaacaaccccccccccccccccccccccccaacccccccccccaaaaaacccaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccfffllrrrrrrkkjjjjjjjcccccaccccc
abaaaccaaaaaacccccaaaaaaccaaaaacccccccccccccccccccccccccccccccccccccaaaaaacccccaaacaaaaaaacccccccccccccccccccccccccccccccccccccccccfffllkkrrrkkkjjddcccccccaaacccc
abaaaccaaaaaccccccaaaaaaaacaaaaaccccccccccccccccccccccccccccccccccccaaacaacccccaaaccccccaaaaccccaaaccccccccccccccccaaaccccccccccccccfeekkkkkkkkkdddddccccaaaaacccc
abaaacccaaaaccccccaacaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccaacaacccccccccccccccaaccccaaaacccccccccccccccaaaacccccccccccccceeekkkkkkdddddddcccaaacaccccc
abaccccccccccccccccccaacccaaaaccccccccccccccccccccccccccccaaccaaccaacccaaaaccccccccccccaaaaaaaacaaaacccccccccccccccaaaacccaaaaacccccceeeekkkkdddddaaccccaacccccccc
abccccccccccccccccccaaccccccaaccccccccccccaaacccccccccccccaaaaaaccaaaacaaaaacccccccccccaaaaaaaacaaaccccccccccccccccaaaacccaaaaaccccccceeeeeeedddcacacccccccccccccc
abccccccccccccccccccccccccccccccccccccccccaaaacaacccccccccaaaaacccaaaaaaaaaaccccccccccccaaaaaacccccccccccccccccccccccccccaaaaaacccccccaeeeeeeddcccccccccccccccaaac
abccccccccccccccccccccccccccccccccccccccccaaaaaaacccccccccaaaaaaccaaaaaaaacaccccccaaacaaaaaaaacccccccccccccccccccccccccccaaaaaacccccccccceeeeaaccccccccccccccccaaa
abcccccccccccccccccccccccccccccccccccccccccaaaaaaccccccccaaaaaaaaccaaaaaaaccccccccaaaaaaaaaaaacccccccccccccccccccccccccccaaaaaacccccccccccccaaaccccccccccccccccaaa
abccccccccccccccccccccccccccccccccccccccaaaaaaaaccccaaaccaaaaaaaacaaaaaaaaaacccccccaaaaaaaccaacccccccccccccccccccccccccccccaacccccccccccccccaaaccccccccccccccaaaaa
abccccccccccccccccccccccccccccccccccccccaaaaaaaaacccaaaaccccaaccaaaaaaaaaaaaaccccaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa`

//#endregion

// input = `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`;
const _26colors = ["yellow", "yellow-green", "green", "green-cyan", "cyan", "cyan-blue", "blue", "purple", "magenta", "red", "orange", "yellow", "yellow-green", "green", "green-cyan", "cyan", "cyan-blue", "blue", "purple", "magenta", "red", "orange", "yellow", "yellow-green", "green", "green-cyan"];

const area = [];

const startPos = {};
const finalPos = {};

function sleep(ms) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(), ms);
  })
}

const lines = input.split(/\r?\n/gm);
lines.forEach((line, i) => {
  let currLineArr = [];
  line.split("").forEach((char, j) => {
    currLineArr.push({
      // direction: ".",
      value: char,
      visited: false
    })

    if (char === "S") {
      startPos.column = j; // j is column
      startPos.line = i; // i is line
    }

    if (char === "E") {
      finalPos.column = j;
      finalPos.line = i;
    }
  })
  area.push(currLineArr);
})

let smallestNumberOfSteps = Number.MAX_SAFE_INTEGER;

function getAdjacentSqrPos(direction, line, col) {
  switch (direction) {
    case "UP":
      return line === 0 ? null : { line: line - 1, column: col };
    case "DOWN":
      return line === area.length - 1 ? null : { line: line + 1, column: col };
    case "LEFT":
      return col === 0 ? null : { line: line, column: col - 1 };
    case "RIGHT":
      return col === area[line].length - 1 ? null : { line: line, column: col + 1 };
    default:
      return null;
  }
}

async function traceRecursive(line, col, currSteps = 0) {

  const currSqr = area[line][col];
  if (currSqr.value === "S" && smallestNumberOfSteps > currSteps) { smallestNumberOfSteps = currSteps; return; }
  currSqr.visited = true;
  document.getElementById(`${line}-${col}`).className = "visited";
  let currSqrValue = currSqr.value === "E" ? "z".charCodeAt(0) : currSqr.value.charCodeAt(0);
  ["UP", "DOWN", "LEFT", "RIGHT"]
    .map(dir => getAdjacentSqrPos(dir, line, col))
    .forEach(async adjacentSqrPos => {
      if (adjacentSqrPos === null) return;
      const adjacentSqr = area[adjacentSqrPos.line][adjacentSqrPos.column];
      if (adjacentSqr.visited === true) return;
      const adjacentSqrValue = adjacentSqr.value === "S" ? "a".charCodeAt(0) : adjacentSqr.value.charCodeAt(0);
      if (adjacentSqrValue + 1 !== currSqrValue && adjacentSqrValue !== currSqrValue) return;
      await sleep(1);
      await traceRecursive(adjacentSqrPos.line, adjacentSqrPos.column, currSteps + 1);
    })
  currSqr.visited = false;
  document.getElementById(`${line}-${col}`).className = "";
}
window.addEventListener("DOMContentLoaded", () => {
  let smallestNumberOfSteps = Number.MAX_SAFE_INTEGER;

  lines.forEach((line, i) => {
    const currLineDiv = document.createElement("div")
    currLineDiv.classList.add("flex");
    line.split("").forEach((char, j) => {
      const currCharDiv = document.createElement("div");
      currCharDiv.id = `${i}-${j}`;
      currCharDiv.innerText = char;
      currCharDiv.className = _26colors[char.toLowerCase().charCodeAt(0) - "a".charCodeAt(0)];
      currLineDiv.appendChild(currCharDiv);
    })
    document.getElementById("playground").appendChild(currLineDiv);
  })

  document.getElementById("start").addEventListener("click", () => {
    traceRecursive(finalPos.line, finalPos.column, 0);
    console.log(smallestNumberOfSteps);
  })
})
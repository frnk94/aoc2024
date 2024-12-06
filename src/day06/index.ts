import run from "aocrunner";
import _ from "lodash";

type TDir = "UP" | "RIGHT" | "DOWN" | "LEFT";

const DIRECTION = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1],
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(""));

const findElementIndex = (
  grid: string[][],
  target: string,
): [number, number] | null => {
  for (const [i, row] of grid.entries()) {
    const j = row.indexOf(target);
    if (j !== -1) return [i, j];
  }
  return null;
};

const getNextDirection = (currentDir: TDir) => {
  const directionKeys = Object.keys(DIRECTION) as TDir[];
  const currentIndex = directionKeys.indexOf(currentDir);
  const nextIndex = (currentIndex + 1) % directionKeys.length;

  return directionKeys[nextIndex];
};

const walk = (
  arr: string[][],
  position: [number, number],
  visited: Set<string>,
  dir: TDir,
  loopDetection = false,
) => {
  let magnetude = 1;

  while (true) {
    const [dY, dX] = DIRECTION[dir];
    const newRow = position[0] + dY * magnetude;
    const newCol = position[1] + dX * magnetude;
    const key = `${newRow}|${newCol}${loopDetection ? `|${dir}` : ""}`;

    if (loopDetection && visited.has(key)) return true;

    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= arr.length ||
      newCol >= arr[0].length
    )
      // Exit condition.
      return loopDetection ? false : undefined;

    if ([".", "^"].includes(arr[newRow][newCol])) {
      visited.add(key);
    } else {
      return walk(
        arr,
        [newRow - dY, newCol - dX],
        visited,
        getNextDirection(dir),
        loopDetection,
      );
    }

    magnetude += 1;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const pos = findElementIndex(input, "^") as [number, number];
  const visited = new Set<string>().add(`${pos[0]}|${pos[1]}`);

  walk(input, pos, visited, "UP");

  return visited.size;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const pos = findElementIndex(input, "^") as [number, number];
  const visited = new Set<string>().add(`${pos[0]}|${pos[1]}`);
  let result = 0;

  // We walk once to populate visited with the path we will take.
  // We only need to add obstacle on the path since adding it elsewhere doesn't mater.
  walk(input, pos, visited, "UP");

  for (const position of visited) {
    const [row, col] = position.split("|").map(Number);
    if (row === pos[0] && col === pos[1]) continue;

    // We copy the original array
    const copy = input.map((row) => [...row]);
    copy[row][col] = "#";

    if (walk(copy, pos, new Set(), "UP", true)) result += 1;
  }

  return result;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

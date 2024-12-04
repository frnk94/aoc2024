import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(" ").map(Number));

const isSafe = (arr: number[], returnIndex = false) => {
  const sign = Math.sign(arr[0] - arr[1]);

  for (let i = 0; i < arr.length - 1; i++) {
    const element = arr[i];
    const next = arr[i + 1];
    const diff = element - next;

    if (sign !== Math.sign(diff) || Math.abs(diff) > 3 || Math.abs(diff) == 0)
      return returnIndex ? i : false;
  }

  return returnIndex ? -1 : true;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;

  for (const puzzle of input) {
    if (isSafe(puzzle)) count++;
  }

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;

  for (const puzzle of input) {
    if (isSafe(puzzle)) {
      count++;
      continue;
    }

    // Not proud of this bruteforce but its late...
    for (let i = 0; i < puzzle.length; i++) {
      const newPuzzle = [...puzzle.slice(0, i), ...puzzle.slice(i + 1)];

      if (isSafe(newPuzzle)) {
        count++;
        break;
      }
    }
  }

  return count;
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

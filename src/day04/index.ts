import run from "aocrunner";

const DIRECTION = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((r) => r.split(""));

const findWordOptimized = (
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: number[],
): boolean => {
  const rows = grid.length;
  const cols = grid[0].length;
  const [dx, dy] = direction;

  for (let index = 1; index < word.length; index++) {
    const newRow = startRow + dx * index;
    const newCol = startCol + dy * index;

    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= rows ||
      newCol >= cols ||
      grid[newRow][newCol] !== word[index]
    ) {
      return false;
    }
  }

  return true;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const word = "XMAS";
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === word[0]) {
        for (const direction of DIRECTION) {
          if (findWordOptimized(input, word, i, j, direction)) {
            result++;
          }
        }
      }
    }
  }

  return result;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const maxRow = input.length;
  const maxCol = input[0].length;

  let result = 0;

  const isValidPair = (el: string, opposite: string): boolean => {
    const validLetters = new Set(["M", "S"]);
    return (
      el !== opposite && validLetters.has(el) && validLetters.has(opposite)
    );
  };

  for (let i = 1; i < maxRow - 1; i++) {
    for (let j = 1; j < maxCol - 1; j++) {
      if (input[i][j] === "A") {
        const topLeft = input[i - 1][j - 1];
        const topRight = input[i - 1][j + 1];
        const bottomLeft = input[i + 1][j - 1];
        const bottomRight = input[i + 1][j + 1];

        if (
          isValidPair(topLeft, bottomRight) &&
          isValidPair(topRight, bottomLeft)
        ) {
          result++;
        }
      }
    }
  }

  return result;
};

run({
  part1: {
    // tests: [
    //   {
    //     input: testInput,
    //     expected: 18,
    //   },
    // ],
    solution: part1,
  },
  part2: {
    // tests: [
    //   {
    //     input: testInput,
    //     expected: 9,
    //   },
    // ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

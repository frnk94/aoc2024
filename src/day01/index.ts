import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").reduce(
    (acc, curr) => {
      const [a, b] = curr.split(/\s+/);

      acc[0].push(Number(a));
      acc[1].push(Number(b));

      return acc;
    },
    [[], []] as number[][],
  );

const part1 = (rawInput: string) => {
  const [listA, listB] = parseInput(rawInput);

  const sortedA = listA.sort((a, b) => a - b);
  const sortedB = listB.sort((a, b) => a - b);

  return sortedA.reduce((acc, a, i) => {
    const b = sortedB[i];

    const diff = Math.abs(a - b);

    return (acc += diff);
  }, 0);
};

const part2 = (rawInput: string) => {
  const [listA, listB] = parseInput(rawInput);
  const occurences = new Map<number, number>();

  for (const element of listB) {
    const n = occurences.get(element) || 0;
    occurences.set(element, n + 1);
  }

  return listA.reduce((acc, curr) => {
    return (acc += curr * (occurences.get(curr) || 0));
  }, 0);
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

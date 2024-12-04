import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).match(/mul\(\d+\,\d+\)/g);

  return input?.reduce((acc, curr) => {
    const [a, b] = curr.split(",").map((v) => Number(v.replace(/\D/g, "")));

    return (acc += a * b);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).match(
    /(mul\(\d+\,\d+\))|(do\(\))|(don't\(\))/g,
  );

  return input?.reduce(
    (acc, curr) => {
      if (curr.startsWith("do(")) return { state: true, value: acc.value };
      if (curr.startsWith("don")) return { state: false, value: acc.value };
      if (!acc.state) return acc;

      const [a, b] = curr.split(",").map((v) => Number(v.replace(/\D/g, "")));

      return { ...acc, value: (acc.value += a * b) };
    },
    { state: true, value: 0 },
  ).value;
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

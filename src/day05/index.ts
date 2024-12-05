import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const [rules, updates] = rawInput.split("\n\n");

  const r = rules.split("\n").map((r) => r.split("|").map(Number));
  const u = updates.split("\n").map((r) => r.split(",").map(Number));

  return [r, u];
};

const setRuleMap = (rules: number[][], map = new Map<number, number[]>()) => {
  for (const [a, b] of rules) {
    const currentRule = map.get(a) || [];
    map.set(a, [...currentRule, b]);
  }

  return map;
};

const getMiddleElement = (arr: any[]): any => {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
};

const reArrangeDP = (
  arr: number[],
  rules: Map<number, number[]>,
  skip = true,
) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const currentElement = arr[i];
    const restOfArray = arr.slice(0, i);
    const rule = rules.get(currentElement);
    if (rule && rule.some((d) => restOfArray.includes(d))) {
      arr.splice(i, 1);
      arr.unshift(currentElement);
      return reArrangeDP(arr, rules, false);
    }
  }

  return skip ? [0] : arr;
};

const part1 = (rawInput: string) => {
  const [r, updates] = parseInput(rawInput);
  const rules = setRuleMap(r);

  return updates.reduce((acc, curr) => {
    let isValid = true;

    for (let i = curr.length - 1; i > 0; i--) {
      const currentElement = curr[i];
      const restOfArray = curr.slice(0, i);
      const rule = rules.get(currentElement);
      if (rule && rule.some((d) => restOfArray.includes(d))) {
        isValid = false;
        break;
      }
    }

    return isValid ? (acc += getMiddleElement(curr)) : acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const [r, updates] = parseInput(rawInput);
  const rules = setRuleMap(r);

  return updates.reduce((acc, curr) => {
    const newUpdates = reArrangeDP(curr, rules);
    return (acc += getMiddleElement(newUpdates));
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

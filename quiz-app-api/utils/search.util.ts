export function findHighestNumberIndexes(numbers: Array<number>, resultAmount: number): Array<number> {
  const indexes = numbers.map((_, index) => index);
  indexes.sort((a, b) => numbers[b] - numbers[a]);
  return indexes.slice(0, resultAmount);
}
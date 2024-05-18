export function toArrayText(arr: Array<string>): string {
  return `{${arr.map(it => `"${it}"`).join(', ')}}`;
}
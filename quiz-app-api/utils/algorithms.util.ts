export function kmpSearch(pattern: string, text: string): number {
  if (pattern.length == 0)
    return 0; // Immediate match

  // Compute longest suffix-prefix table
  let lsp = [0]; // Base case
  for (let i = 1; i < pattern.length; i++) {
    let j = lsp[i - 1]; // Start by assuming we're extending the previous LSP
    while (j > 0 && pattern[i] !== pattern[j])
      j = lsp[j - 1];
    if (pattern[i] === pattern[j])
      j++;
    lsp.push(j);
  }

  // Walk through text string
  let j = 0; // Number of chars matched in pattern
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] != pattern[j])
      j = lsp[j - 1]; // Fall back in the pattern
    if (text[i]  == pattern[j]) {
      j++; // Next char matched, increment position
      if (j == pattern.length) {
        return i - (j - 1);
      }
    }
  }
  return -1; // Not found
}
export const convertIndexToAlphabet = (num: number): string | undefined => {
  let columnLetter = '',
  t;
  while (num > 0) {
    t = (num - 1) % 26;
    columnLetter = String.fromCharCode(65 + t) + columnLetter;
    num = (num - t) / 26 | 0;
  }
  return columnLetter || undefined;
}

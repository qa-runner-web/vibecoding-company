const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to']);

export function titleCase(sentence) {
  if (typeof sentence !== 'string') {
    throw new TypeError('titleCase: expected a string');
  }
  return sentence
    .split(' ')
    .map((word, i) => {
      if (word === '') return word;
      const lower = word.toLowerCase();
      if (i > 0 && SMALL.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

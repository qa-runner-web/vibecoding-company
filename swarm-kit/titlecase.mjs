const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to']);

export function titlecase(sentence) {
  if (typeof sentence !== 'string') {
    throw new TypeError('titlecase: expected a string');
  }
  return sentence
    .toLowerCase()
    .split(/(\s+)/)
    .map((word, i, all) => {
      if (/^\s*$/.test(word) || word === '') return word;
      const isEdge = i === 0 || i === all.length - 1;
      if (!isEdge && SMALL.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/** Pair corresponding elements, stopping at the shorter array. */
export function zip(first, second) {
  if (!Array.isArray(first) || !Array.isArray(second)) {
    throw new TypeError('zip expects two arrays');
  }

  const pairs = [];
  for (let index = 0; index < Math.min(first.length, second.length); index++) {
    pairs.push([first[index], second[index]]);
  }
  return pairs;
}

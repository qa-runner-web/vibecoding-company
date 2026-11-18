/** Pair corresponding array elements, stopping at the shorter array. */
export function zip(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    throw new TypeError('zip expects two arrays');
  }
  const pairs = [];
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    pairs.push([left[i], right[i]]);
  }
  return pairs;
}

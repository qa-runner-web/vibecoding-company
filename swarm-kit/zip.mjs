/** Pair corresponding values, stopping when the shorter array ends. */
export function zip(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    throw new TypeError('zip requires two arrays');
  }
  const pairs = [];
  for (let i = 0; i < Math.min(left.length, right.length); i += 1) {
    pairs.push([left[i], right[i]]);
  }
  return pairs;
}

export default zip;

/** Pair entries at corresponding indexes, stopping at the shorter array. */
export function zip(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    throw new TypeError('zip expects two arrays');
  }
  return Array.from({ length: Math.min(left.length, right.length) }, (_, index) => [
    left[index], right[index],
  ]);
}

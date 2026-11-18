/** Pair elements by index, stopping at the end of the shorter array. */
export function zip(left, right) {
  const length = Math.min(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]);
}

export default zip;

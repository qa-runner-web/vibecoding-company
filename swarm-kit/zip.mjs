/** Pair corresponding elements, stopping at the shorter array. */
export function zip(first, second) {
  if (!Array.isArray(first) || !Array.isArray(second)) {
    throw new TypeError('zip expects two arrays');
  }
  return Array.from({ length: Math.min(first.length, second.length) },
    (_, index) => [first[index], second[index]]);
}

export default zip;

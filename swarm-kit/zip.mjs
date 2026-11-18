/** Pair elements at corresponding indices, stopping at the shorter array. */
export function zip(first, second) {
  const length = Math.min(first.length, second.length);
  return Array.from({ length }, (_, index) => [first[index], second[index]]);
}

/** Return integers from start toward end, including end when reached exactly.
 * The default step is 1 for ascending ranges and -1 for descending ranges.
 * A step pointing away from the end produces an empty array.
 */
export function range(start, end, step = start <= end ? 1 : -1) {
  if (![start, end, step].every(Number.isSafeInteger) || step === 0) {
    throw new RangeError('start, end, and nonzero step must be safe integers');
  }
  if ((start < end && step < 0) || (start > end && step > 0)) return [];

  const result = [];
  for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
    result.push(value);
  }
  return result;
}

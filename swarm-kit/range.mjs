/** Return integers from start toward end, including end when reached exactly. */
export function range(start, end, step = start <= end ? 1 : -1) {
  if (![start, end, step].every(Number.isSafeInteger) || step === 0) {
    throw new RangeError('start, end, and nonzero step must be safe integers');
  }
  const values = [];
  if ((start < end && step < 0) || (start > end && step > 0)) return values;
  for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
    values.push(value);
  }
  return values;
}

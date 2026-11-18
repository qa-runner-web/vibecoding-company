/** Return integers from start (inclusive) to end (exclusive), stepping by step. */
export function range(start, end, step = 1) {
  if (![start, end, step].every(Number.isSafeInteger) || step === 0) {
    throw new RangeError('start, end and nonzero step must be safe integers');
  }
  const result = [];
  for (let value = start; step > 0 ? value < end : value > end; value += step) {
    result.push(value);
  }
  return result;
}

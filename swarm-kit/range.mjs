/** Return an inclusive integer sequence from start towards end. */
export function range(start, end, step = start <= end ? 1 : -1) {
  if (![start, end, step].every(Number.isSafeInteger)) {
    throw new RangeError('start, end, and step must be safe integers');
  }
  if (step === 0) throw new RangeError('step must not be zero');
  const values = [];
  if ((start < end && step < 0) || (start > end && step > 0)) return values;
  for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
    values.push(value);
  }
  return values;
}

export default range;

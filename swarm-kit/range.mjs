/** Return integers from start toward end, including end if reached exactly. */
export function range(start, end, step = start <= end ? 1 : -1) {
  if (![start, end, step].every(Number.isSafeInteger) || step === 0) {
    throw new RangeError('start, end and nonzero step must be safe integers');
  }
  const result = [];
  if ((start < end && step < 0) || (start > end && step > 0)) return result;
  for (let current = start; step > 0 ? current <= end : current >= end;) {
    result.push(current);
    // Stop before incrementing past the bound, avoiding unsafe integer overflow.
    if (step > 0 ? end - current < step : current - end < -step) break;
    current += step;
  }
  return result;
}

export default range;

/**
 * Return integers from start toward end, including end if reached exactly.
 * The default step follows the direction of the endpoints. A step pointing
 * away from end yields an empty array.
 */
export function range(start, end, step = start <= end ? 1 : -1) {
  if (![start, end, step].every(Number.isSafeInteger) || step === 0) {
    throw new RangeError('start, end and nonzero step must be safe integers');
  }
  if ((start < end && step < 0) || (start > end && step > 0)) return [];

  const result = [];
  for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
    result.push(value);
    // An unsafe next value cannot lie within the safe-integer endpoint.
    if (!Number.isSafeInteger(value + step)) break;
  }
  return result;
}

export default range;

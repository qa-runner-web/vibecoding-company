/** Restrict a number to an inclusive interval. */
export function clamp(value, min, max) {
  if ([value, min, max].some(number => typeof number !== 'number' || Number.isNaN(number))) {
    throw new TypeError('value and bounds must be numbers');
  }
  if (min > max) {
    throw new RangeError('min must not exceed max');
  }
  return Math.min(max, Math.max(min, value));
}

export default clamp;

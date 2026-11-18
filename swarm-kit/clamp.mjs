/** Restrict a number to the inclusive interval [min, max]. */
export function clamp(value, min, max) {
  if (min > max) throw new RangeError('min must not exceed max');
  return Math.min(max, Math.max(min, value));
}

export default clamp;

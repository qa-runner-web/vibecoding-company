export function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('clamp requires min <= max');
  }
  return Math.min(Math.max(value, min), max);
}

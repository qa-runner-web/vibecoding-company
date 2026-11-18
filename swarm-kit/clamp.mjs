export function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('clamp: min must not be greater than max');
  }
  return Math.min(max, Math.max(min, value));
}

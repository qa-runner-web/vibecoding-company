export function clamp(x, min, max) {
  if (min > max) throw new RangeError('clamp: min must be <= max');
  return Math.min(Math.max(x, min), max);
}

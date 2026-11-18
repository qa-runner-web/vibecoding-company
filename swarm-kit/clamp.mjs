export function clamp(x, min, max) {
  if (min > max) throw new RangeError('min must be <= max');
  return Math.min(Math.max(x, min), max);
}

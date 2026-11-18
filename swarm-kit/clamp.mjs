export function clamp(n, min, max) {
  if (min > max) {
    throw new RangeError(`clamp: min (${min}) must not exceed max (${max})`);
  }
  return Math.min(Math.max(n, min), max);
}

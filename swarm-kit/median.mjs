/** Return the median of a non-empty array of finite numbers without modifying it. */
export function median(values) {
  if (!Array.isArray(values) || values.length === 0 || !values.every(Number.isFinite)) {
    throw new RangeError('values must be a non-empty array of finite numbers');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  const left = sorted[middle - 1];
  const right = sorted[middle];
  return left < 0 && right > 0 ? (left + right) / 2 : left + (right - left) / 2;
}

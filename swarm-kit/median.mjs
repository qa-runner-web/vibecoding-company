/** Return the median of a non-empty array of finite numbers without mutating it. */
export function median(values) {
  if (!Array.isArray(values)) throw new TypeError('values must be an array');
  if (values.length === 0) throw new RangeError('values must not be empty');
  if (!values.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    throw new TypeError('values must contain only finite numbers');
  }

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : sorted[middle - 1] / 2 + sorted[middle] / 2;
}

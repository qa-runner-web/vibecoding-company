/** Return the median of a non-empty array of finite numbers without mutating it. */
export function median(values) {
  if (!Array.isArray(values) || !Array.from(values).every(Number.isFinite)) {
    throw new TypeError('values must be an array of finite numbers');
  }
  if (values.length === 0) {
    throw new RangeError('values must not be empty');
  }

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];

  const lower = sorted[middle - 1];
  const upper = sorted[middle];
  // Avoid overflowing when the two middle values have opposite signs.
  return lower < 0 && upper > 0
    ? lower / 2 + upper / 2
    : lower + (upper - lower) / 2;
}

export default median;

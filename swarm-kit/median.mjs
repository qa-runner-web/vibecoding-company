/** Return the middle value of a nonempty array of finite numbers. */
export function median(values) {
  if (!Array.isArray(values)) throw new TypeError('values must be an array');
  if (values.length === 0) throw new RangeError('values must not be empty');
  for (const value of values) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError('values must contain only finite numbers');
    }
  }

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];

  const lower = sorted[middle - 1];
  const upper = sorted[middle];
  // Avoid overflow when adding two large values or subtracting opposite signs.
  return lower < 0 && upper > 0
    ? lower / 2 + upper / 2
    : lower + (upper - lower) / 2;
}

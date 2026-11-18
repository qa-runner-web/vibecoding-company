/** Return the median of a nonempty array of finite numbers, without modifying it. */
export function median(numbers) {
  if (!Array.isArray(numbers) || numbers.some(value => typeof value !== 'number' || !Number.isFinite(value))) {
    throw new TypeError('numbers must be an array of finite numbers');
  }
  if (numbers.length === 0) throw new RangeError('numbers must not be empty');
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  const lower = sorted[middle - 1];
  const upper = sorted[middle];
  // Opposite signs can be added safely; for equal signs, the difference is safe.
  return lower < 0 && upper > 0 ? (lower + upper) / 2 : lower + (upper - lower) / 2;
}

export default median;

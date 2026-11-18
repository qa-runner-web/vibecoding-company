/** Return the median of a nonempty array of finite numbers without modifying it. */
export function median(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('numbers must be an array');
  if (numbers.length === 0 || !Array.from(numbers).every(Number.isFinite)) {
    throw new RangeError('numbers must be a nonempty array of finite numbers');
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[middle];
  const a = sorted[middle - 1];
  const b = sorted[middle];
  const difference = b - a;
  return Number.isFinite(difference) ? a + difference / 2 : a / 2 + b / 2;
}

export default median;

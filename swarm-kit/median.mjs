/** Return the median of finite numbers, or undefined for an empty array.
 * The input array is not modified.
 */
export function median(values) {
  if (!Array.isArray(values)) throw new TypeError('values must be an array');
  for (const value of values) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError('values must contain only finite numbers');
    }
  }
  if (values.length === 0) return undefined;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : sorted[middle - 1] / 2 + sorted[middle] / 2;
}

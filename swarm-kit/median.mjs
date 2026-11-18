export function median(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('median requires a non-empty array');
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

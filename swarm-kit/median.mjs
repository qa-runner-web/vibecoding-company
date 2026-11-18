export function median(nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new RangeError('median: expected a non-empty array of numbers');
  }
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

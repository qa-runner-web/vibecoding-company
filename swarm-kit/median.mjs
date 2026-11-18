export function median(nums) {
  if (!Array.isArray(nums) || nums.length === 0) throw new RangeError('median: expected a non-empty array');
  const s = [...nums].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export function zip(...arrays) {
  if (arrays.length === 0) return [];
  const n = Math.min(...arrays.map((a) => a.length));
  return Array.from({ length: n }, (_, i) => arrays.map((a) => a[i]));
}

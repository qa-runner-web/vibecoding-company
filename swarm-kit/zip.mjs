export function zip(a, b) {
  const n = Math.min(a.length, b.length);
  return Array.from({ length: n }, (_, i) => [a[i], b[i]]);
}

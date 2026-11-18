// Pair up two arrays element by element. The result is as long as the shorter input.
export function zip(a, b) {
  const n = Math.min(a.length, b.length);
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = [a[i], b[i]];
  return out;
}

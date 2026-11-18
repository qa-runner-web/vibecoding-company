export function zip(a, b) {
  const length = Math.min(a.length, b.length);
  const out = [];
  for (let i = 0; i < length; i++) {
    out.push([a[i], b[i]]);
  }
  return out;
}

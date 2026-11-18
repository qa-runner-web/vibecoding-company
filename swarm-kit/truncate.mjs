export function truncate(str, n, ellipsis = '...') {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('truncate: n must be a non-negative integer');
  const s = String(str);
  if (s.length <= n) return s;
  if (ellipsis.length >= n) return ellipsis.slice(0, n);
  return s.slice(0, n - ellipsis.length) + ellipsis;
}

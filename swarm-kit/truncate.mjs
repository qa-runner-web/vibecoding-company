export function truncate(text, n, ellipsis = '...') {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('truncate length must be a non-negative integer');
  }
  const str = String(text);
  if (str.length <= n) return str;
  if (ellipsis.length >= n) return ellipsis.slice(0, n);
  return str.slice(0, n - ellipsis.length) + ellipsis;
}

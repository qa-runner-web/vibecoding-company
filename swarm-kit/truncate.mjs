// Shorten a string to at most n characters, ending with an ellipsis when cut.
export function truncate(str, n, ellipsis = '...') {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('n must be a non-negative integer');
  if (str.length <= n) return str;
  if (n <= ellipsis.length) return ellipsis.slice(0, n);
  return str.slice(0, n - ellipsis.length) + ellipsis;
}

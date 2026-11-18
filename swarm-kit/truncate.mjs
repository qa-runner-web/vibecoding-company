export function truncate(s, n, ellipsis = '…') {
  s = String(s);
  if (s.length <= n) return s;
  if (n <= ellipsis.length) return ellipsis.slice(0, Math.max(0, n));
  return s.slice(0, n - ellipsis.length) + ellipsis;
}

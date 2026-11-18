export function truncate(s, max, ellipsis = '…') {
  s = String(s);
  if (s.length <= max) return s;
  if (max <= ellipsis.length) return ellipsis.slice(0, Math.max(0, max));
  return s.slice(0, max - ellipsis.length) + ellipsis;
}

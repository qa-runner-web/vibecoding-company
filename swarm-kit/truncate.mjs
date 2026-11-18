/**
 * Shorten a string to at most n characters, ending with an ellipsis when cut.
 * The result (including the ellipsis) never exceeds n characters.
 * @param {string} str
 * @param {number} n
 * @returns {string}
 */
export function truncate(str, n) {
  if (str.length <= n) return str;
  const ellipsis = '...';
  if (n <= ellipsis.length) return ellipsis.slice(0, Math.max(0, n));
  return str.slice(0, n - ellipsis.length) + ellipsis;
}

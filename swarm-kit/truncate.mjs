/**
 * Limit a string to at most `maxLength` Unicode code points, including the
 * suffix. Strings that already fit are returned unchanged.
 */
export function truncate(value, maxLength, suffix = '…') {
  if (typeof value !== 'string' || typeof suffix !== 'string') {
    throw new TypeError('value and suffix must be strings');
  }
  if (!Number.isSafeInteger(maxLength) || maxLength < 0) {
    throw new RangeError('maxLength must be a non-negative safe integer');
  }

  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;
  const ending = Array.from(suffix).slice(0, maxLength);
  return characters.slice(0, maxLength - ending.length).join('') + ending.join('');
}

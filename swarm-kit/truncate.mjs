/** Shorten a string to at most maxLength Unicode code points, including the ellipsis. */
export function truncate(value, maxLength) {
  if (typeof value !== 'string') throw new TypeError('value must be a string');
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError('maxLength must be a non-negative integer');
  }
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;
  if (maxLength === 0) return '';
  return characters.slice(0, maxLength - 1).join('') + '…';
}

export default truncate;

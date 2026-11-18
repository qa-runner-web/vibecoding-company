/**
 * Shorten a string to at most `length` Unicode code points, including `...`.
 * When the limit is less than three, the ellipsis itself is shortened.
 */
export function truncate(value, length) {
  if (typeof value !== 'string') throw new TypeError('value must be a string');
  if (!Number.isSafeInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative safe integer');
  }

  const characters = Array.from(value);
  if (characters.length <= length) return value;
  if (length <= 3) return '.'.repeat(length);
  return characters.slice(0, length - 3).join('') + '...';
}

export default truncate;

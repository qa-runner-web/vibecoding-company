/** Shorten a string to at most `length` Unicode code points, including an ellipsis. */
export function truncate(value, length) {
  if (typeof value !== 'string') throw new TypeError('value must be a string');
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative integer');
  }

  const characters = Array.from(value);
  if (characters.length <= length) return value;
  if (length === 0) return '';
  return `${characters.slice(0, length - 1).join('')}…`;
}

export default truncate;

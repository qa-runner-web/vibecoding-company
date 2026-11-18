/** Split an array into consecutive groups of at most size elements. */
export function chunk(values, size) {
  if (!Array.isArray(values)) throw new TypeError('values must be an array');
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive safe integer');
  }
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

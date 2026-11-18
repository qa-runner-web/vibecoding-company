/** Split an array into consecutive arrays of at most size elements. */
export function chunk(array, size) {
  if (!Array.isArray(array)) throw new TypeError('array must be an array');
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive safe integer');
  }
  const chunks = [];
  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }
  return chunks;
}

export default chunk;

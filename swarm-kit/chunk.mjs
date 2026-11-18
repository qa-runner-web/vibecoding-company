/** Split an array into consecutive arrays of at most size elements. */
export function chunk(values, size) {
  if (!Number.isSafeInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive safe integer');
  }
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

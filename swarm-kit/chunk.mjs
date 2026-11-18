export function chunk(arr, n) {
  if (!Array.isArray(arr)) {
    throw new TypeError('chunk: expected an array');
  }
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`chunk: size must be a positive integer, got ${n}`);
  }
  const out = [];
  for (let i = 0; i < arr.length; i += n) {
    out.push(arr.slice(i, i + n));
  }
  return out;
}

export function chunk(arr, n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError('n must be a positive integer');
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

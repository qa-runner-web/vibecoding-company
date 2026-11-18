export function range(a, b, step = 1) {
  if (!step) throw new RangeError('step must be non-zero');
  const out = [];
  if (step > 0) for (let i = a; i <= b; i += step) out.push(i);
  else for (let i = a; i >= b; i += step) out.push(i);
  return out;
}

export function range(a, b, step = 1) {
  if (step === 0 || !Number.isFinite(step)) throw new RangeError('range: step must be a non-zero finite number');
  const out = [];
  if (step > 0) for (let x = a; x < b; x += step) out.push(x);
  else for (let x = a; x > b; x += step) out.push(x);
  return out;
}

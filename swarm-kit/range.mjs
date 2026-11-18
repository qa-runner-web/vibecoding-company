// Return the integers from a up to (not including) b, moving by step.
// A negative step counts down; a zero step is rejected.
export function range(a, b, step = 1) {
  if (step === 0) throw new RangeError('step must not be zero');
  const out = [];
  if (step > 0) for (let i = a; i < b; i += step) out.push(i);
  else for (let i = a; i > b; i += step) out.push(i);
  return out;
}

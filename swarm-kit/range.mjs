/**
 * Integers from a up to (not including) b, moving by step.
 * step defaults to 1 when a < b and -1 when a > b.
 * Throws on step 0 or a step whose sign cannot reach b.
 */
export function range(a, b, step) {
  if (step === undefined) step = a <= b ? 1 : -1;
  if (step === 0) throw new RangeError("step must not be 0");
  if ((b - a) * step < 0) throw new RangeError("step moves away from end");
  const out = [];
  if (step > 0) for (let i = a; i < b; i += step) out.push(i);
  else for (let i = a; i > b; i += step) out.push(i);
  return out;
}

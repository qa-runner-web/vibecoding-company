/** Return the distinct values in input order using SameValueZero equality. */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

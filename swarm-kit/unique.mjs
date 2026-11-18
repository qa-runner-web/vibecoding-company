/** Return distinct values in first-occurrence order using SameValueZero equality. */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

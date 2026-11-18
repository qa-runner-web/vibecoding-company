/** Return the distinct values in their first-occurrence order. */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

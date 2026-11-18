/** Return the first occurrence of each value, preserving its input order. */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

/** Return the distinct values in their first-seen order (using Set equality). */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

/** Return the first occurrence of each value, preserving its original order.
 * Values are compared using SameValueZero, as in Set.
 * @template T
 * @param {T[]} values
 * @returns {T[]}
 */
export function unique(values) {
  return [...new Set(values)];
}

export default unique;

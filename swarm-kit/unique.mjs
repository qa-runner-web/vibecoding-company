// Return a new array without duplicate values, keeping the first occurrence order.
export function unique(arr) {
  return [...new Set(arr)];
}

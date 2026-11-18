/** Capitalize each sequence of letters and lowercase the remaining letters. */
export function titlecase(value) {
  return value.replace(/\p{L}+/gu, word => {
    const [first, ...rest] = word;
    return first.toUpperCase() + rest.join('').toLowerCase();
  });
}

export default titlecase;

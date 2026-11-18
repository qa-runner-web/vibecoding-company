/** Convert a string to a lowercase, hyphen-separated URL slug. */
export function slugify(value) {
  if (typeof value !== 'string') throw new TypeError('value must be a string');

  return value
    .normalize('NFKD')
    .replace(/\p{Mark}+/gu, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** Convert a string into a lowercase, hyphen-separated URL slug. */
export function slugify(input) {
  if (typeof input !== 'string') throw new TypeError('input must be a string');
  return input
    .normalize('NFKD')
    .replace(/\p{Mark}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default slugify;

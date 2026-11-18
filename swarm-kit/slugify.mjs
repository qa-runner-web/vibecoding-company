/** Turn text into a lowercase, hyphen-separated URL slug. */
export function slugify(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }

  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('slugify: expected a string');
  }
  return str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

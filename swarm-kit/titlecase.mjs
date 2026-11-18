export function titlecase(s) {
  return String(s).toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, p, c) => p + c.toUpperCase());
}

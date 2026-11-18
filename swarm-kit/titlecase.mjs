export function titlecase(s) {
  return String(s).toLowerCase().replace(/(^|[^a-z0-9'])([a-z])/g, (_, p, c) => p + c.toUpperCase());
}

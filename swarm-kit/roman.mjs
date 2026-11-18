const T = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) throw new RangeError('n must be an integer 1..3999');
  let out = '';
  for (const [v, s] of T) while (n >= v) { out += s; n -= v; }
  return out;
}
export function fromRoman(str) {
  if (!/^[MDCLXVI]+$/.test(str)) throw new SyntaxError('invalid roman numeral');
  let n = 0, i = 0;
  for (const [v, s] of T) while (str.startsWith(s, i)) { n += v; i += s.length; }
  if (i !== str.length || toRoman(n) !== str) throw new SyntaxError('invalid roman numeral');
  return n;
}

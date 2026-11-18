const TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError('toRoman: expected an integer from 1 to 3999');
  }
  let out = '';
  let rest = n;
  for (const [value, symbol] of TABLE) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

export function fromRoman(s) {
  if (typeof s !== 'string' || !/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(s) || s === '') {
    throw new SyntaxError(`fromRoman: invalid Roman numeral "${s}"`);
  }
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = VALUES[s[i]];
    const next = VALUES[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}

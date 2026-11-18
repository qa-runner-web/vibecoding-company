const VALUES = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const SYMBOLS = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError(`toRoman: expected an integer from 1 to 3999, got ${n}`);
  }
  let rest = n;
  let out = '';
  for (const [value, symbol] of VALUES) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}

export function fromRoman(s) {
  if (typeof s !== 'string' || !/^[IVXLCDM]+$/.test(s) || toRomanSafe(fromRomanRaw(s)) !== s) {
    throw new SyntaxError(`fromRoman: not a valid Roman numeral: ${s}`);
  }
  return fromRomanRaw(s);
}

function fromRomanRaw(s) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = SYMBOLS[s[i]];
    const next = SYMBOLS[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}

function toRomanSafe(n) {
  return n >= 1 && n <= 3999 ? toRoman(n) : '';
}

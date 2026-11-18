const NUMERALS = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert an integer from 1 to 3999 into its canonical Roman numeral. */
export function toRoman(number) {
  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new RangeError('Roman numerals require an integer from 1 to 3999');
  }
  let result = '';
  for (const [value, symbol] of NUMERALS) {
    while (number >= value) {
      result += symbol;
      number -= value;
    }
  }
  return result;
}

/** Convert a canonical uppercase Roman numeral to an integer. */
export function fromRoman(numeral) {
  if (typeof numeral !== 'string' || numeral.length === 0) {
    throw new TypeError('Expected a nonempty Roman numeral string');
  }
  let index = 0;
  let result = 0;
  for (const [value, symbol] of NUMERALS) {
    while (numeral.startsWith(symbol, index)) {
      result += value;
      index += symbol.length;
    }
  }
  if (index !== numeral.length || result > 3999 || toRoman(result) !== numeral) {
    throw new RangeError('Expected a canonical Roman numeral from I to MMMCMXCIX');
  }
  return result;
}

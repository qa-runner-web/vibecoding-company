const symbols = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert an integer from 1 through 3999 to a canonical Roman numeral. */
export function toRoman(value) {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError('value must be an integer from 1 to 3999');
  }
  let remaining = value;
  let result = '';
  for (const [amount, numeral] of symbols) {
    while (remaining >= amount) {
      result += numeral;
      remaining -= amount;
    }
  }
  return result;
}

/** Convert a canonical uppercase Roman numeral to an integer. */
export function fromRoman(value) {
  if (typeof value !== 'string') throw new TypeError('value must be a string');
  let remaining = value;
  let result = 0;
  for (const [amount, numeral] of symbols) {
    while (remaining.startsWith(numeral)) {
      result += amount;
      remaining = remaining.slice(numeral.length);
    }
  }
  if (remaining || result < 1 || result > 3999 || toRoman(result) !== value) {
    throw new RangeError('value must be a canonical Roman numeral from I to MMMCMXCIX');
  }
  return result;
}

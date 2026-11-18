const numerals = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert an integer from 1 to 3999 to a canonical Roman numeral. */
export function toRoman(value) {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError('value must be an integer from 1 to 3999');
  }
  let result = '';
  for (const [amount, numeral] of numerals) {
    while (value >= amount) {
      result += numeral;
      value -= amount;
    }
  }
  return result;
}

/** Parse a canonical uppercase Roman numeral from I through MMMCMXCIX. */
export function fromRoman(value) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError('value must be a non-empty Roman numeral string');
  }
  let total = 0;
  let index = 0;
  for (const [amount, numeral] of numerals) {
    while (value.startsWith(numeral, index)) {
      total += amount;
      index += numeral.length;
    }
  }
  if (index !== value.length || total < 1 || total > 3999 || toRoman(total) !== value) {
    throw new RangeError('value must be a canonical Roman numeral from I to MMMCMXCIX');
  }
  return total;
}

const numerals = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert an integer from 1 to 3999 to a canonical Roman numeral. */
export function toRoman(value) {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError('value must be an integer between 1 and 3999');
  }

  let result = '';
  for (const [number, numeral] of numerals) {
    while (value >= number) {
      result += numeral;
      value -= number;
    }
  }
  return result;
}

/** Convert a canonical uppercase Roman numeral to an integer. */
export function fromRoman(input) {
  if (typeof input !== 'string' || !input || !/^[IVXLCDM]+$/.test(input)) {
    throw new TypeError('input must be an uppercase Roman numeral');
  }

  let value = 0;
  let position = 0;
  for (const [number, numeral] of numerals) {
    while (input.startsWith(numeral, position)) {
      value += number;
      position += numeral.length;
    }
  }
  if (position !== input.length || value > 3999 || toRoman(value) !== input) {
    throw new RangeError('input must be a canonical Roman numeral between I and MMMCMXCIX');
  }
  return value;
}

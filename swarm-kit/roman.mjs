const numerals = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** Convert an integer from 1 through 3999 to a canonical Roman numeral. */
export function toRoman(number) {
  if (!Number.isInteger(number) || number < 1 || number > 3999) {
    throw new RangeError('number must be an integer between 1 and 3999');
  }
  let result = '';
  for (const [value, symbol] of numerals) {
    while (number >= value) {
      result += symbol;
      number -= value;
    }
  }
  return result;
}

/** Convert a canonical uppercase Roman numeral to an integer. */
export function fromRoman(roman) {
  if (typeof roman !== 'string' || !/^(?=.+)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(roman)) {
    throw new RangeError('roman must be a canonical uppercase Roman numeral from I to MMMCMXCIX');
  }
  let position = 0;
  let result = 0;
  for (const [value, symbol] of numerals) {
    while (roman.startsWith(symbol, position)) {
      result += value;
      position += symbol.length;
    }
  }
  return result;
}

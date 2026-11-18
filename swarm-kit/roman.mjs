/** Convert an integer from 1 through 3999 to a Roman numeral. */
export function roman(value) {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    throw new RangeError('value must be an integer between 1 and 3999');
  }

  const numerals = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  for (const [amount, symbol] of numerals) {
    while (value >= amount) {
      result += symbol;
      value -= amount;
    }
  }
  return result;
}

/** Convert a canonical uppercase Roman numeral from I through MMMCMXCIX to an integer. */
export function fromRoman(numeral) {
  if (typeof numeral !== 'string' || !/^[IVXLCDM]+$/.test(numeral)) {
    throw new RangeError('numeral must be a canonical Roman numeral between I and MMMCMXCIX');
  }

  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < numeral.length; i++) {
    const value = values[numeral[i]];
    result += value < values[numeral[i + 1]] ? -value : value;
  }
  if (result < 1 || result > 3999 || roman(result) !== numeral) {
    throw new RangeError('numeral must be a canonical Roman numeral between I and MMMCMXCIX');
  }
  return result;
}

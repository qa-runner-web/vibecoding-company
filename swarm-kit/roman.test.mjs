import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts common values including subtractive notation', () => {
  for (const [number, numeral] of [[1, 'I'], [4, 'IV'], [9, 'IX'], [49, 'XLIX'], [1994, 'MCMXCIV'], [3999, 'MMMCMXCIX']]) {
    assert.equal(toRoman(number), numeral);
    assert.equal(fromRoman(numeral), number);
  }
});

test('round trips every supported integer', () => {
  for (let number = 1; number <= 3999; number++) {
    assert.equal(fromRoman(toRoman(number)), number);
  }
});

test('rejects integers outside the supported range and non-integers', () => {
  for (const number of [0, -1, 4000, 1.5, NaN, Infinity]) {
    assert.throws(() => toRoman(number), RangeError);
  }
});

test('rejects malformed or non-canonical numerals', () => {
  for (const numeral of ['IIII', 'IL', 'IIV', 'MMMM', 'iv', 'ABC']) {
    assert.throws(() => fromRoman(numeral), RangeError);
  }
  assert.throws(() => fromRoman(''), TypeError);
  assert.throws(() => fromRoman(null), TypeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { roman, fromRoman } from './roman.mjs';

test('converts additive numerals', () => {
  assert.equal(roman(1), 'I');
  assert.equal(roman(58), 'LVIII');
});

test('uses subtractive notation', () => {
  assert.equal(roman(944), 'CMXLIV');
  assert.equal(roman(1994), 'MCMXCIV');
});

test('supports the upper bound', () => {
  assert.equal(roman(3999), 'MMMCMXCIX');
});

test('rejects values outside the supported integer range', () => {
  for (const value of [0, -1, 4000, 1.5, NaN, '4']) {
    assert.throws(() => roman(value), RangeError);
  }
});

test('converts canonical Roman numerals to integers', () => {
  for (const [numeral, value] of [['I', 1], ['LVIII', 58], ['CMXLIV', 944], ['MCMXCIV', 1994], ['MMMCMXCIX', 3999]]) {
    assert.equal(fromRoman(numeral), value);
  }
});

test('rejects invalid or noncanonical numerals', () => {
  for (const numeral of ['', 'IIII', 'IIV', 'IL', 'VX', 'MMMM', 'i', ' IV', 'IV ', 'IV\n', 'ABC', 4, null]) {
    assert.throws(() => fromRoman(numeral), RangeError);
  }
});

test('round-trips every supported integer', () => {
  for (let value = 1; value <= 3999; value++) {
    assert.equal(fromRoman(roman(value)), value);
  }
});

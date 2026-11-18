import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts ordinary and subtractive values to Roman numerals', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(49), 'XLIX');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
});

test('parses canonical numerals and round trips the entire supported range', () => {
  assert.equal(fromRoman('MCMXCIV'), 1994);
  for (let value = 1; value <= 3999; value++) {
    assert.equal(fromRoman(toRoman(value)), value);
  }
});

test('rejects integers outside the range and non-integers', () => {
  for (const value of [0, -1, 4000, 1.5, NaN, Infinity, '1']) {
    assert.throws(() => toRoman(value), RangeError);
  }
});

test('rejects malformed, non-canonical, and out-of-range numerals', () => {
  for (const value of ['', 'abc', 'iv', 'IIII', 'IL', 'IIV', 'MMMM', 'VX', null]) {
    assert.throws(() => fromRoman(value));
  }
});

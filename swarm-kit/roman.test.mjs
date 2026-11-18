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

// Additional coverage retained from the integration branch.
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
  for (const numeral of ['IIII', 'IL', 'IIV', 'MMMM']) {
    assert.throws(() => fromRoman(numeral), RangeError);
  }
  for (const numeral of ['iv', 'ABC']) assert.throws(() => fromRoman(numeral), TypeError);
  assert.throws(() => fromRoman(''), TypeError);
  assert.throws(() => fromRoman(null), TypeError);
});

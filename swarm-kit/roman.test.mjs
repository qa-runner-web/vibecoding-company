import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts integers using additive and subtractive notation', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(49), 'XLIX');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
});

test('parses canonical Roman numerals', () => {
  assert.equal(fromRoman('I'), 1);
  assert.equal(fromRoman('XLIX'), 49);
  assert.equal(fromRoman('MCMXCIV'), 1994);
  assert.equal(fromRoman('MMMCMXCIX'), 3999);
});

test('round trips every integer in the supported range', () => {
  for (let value = 1; value <= 3999; value++) {
    assert.equal(fromRoman(toRoman(value)), value);
  }
});

test('rejects out-of-range and noninteger values', () => {
  for (const value of [0, -1, 4000, 1.5, NaN, Infinity]) {
    assert.throws(() => toRoman(value), RangeError);
  }
});

test('rejects malformed and noncanonical numerals', () => {
  for (const value of ['IIII', 'IL', 'IC', 'MCMC', 'MMMM', 'iv', 'ABC']) {
    assert.throws(() => fromRoman(value), RangeError);
  }
  assert.throws(() => fromRoman(''), TypeError);
  assert.throws(() => fromRoman(1), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts additive and subtractive numerals', () => {
  assert.equal(toRoman(3), 'III');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(fromRoman('XLII'), 42);
});

test('round-trips every supported integer', () => {
  for (let value = 1; value <= 3999; value += 1) {
    assert.equal(fromRoman(toRoman(value)), value);
  }
});

test('rejects integers outside the supported range', () => {
  for (const value of [0, -1, 1.5, 4000]) assert.throws(() => toRoman(value), RangeError);
});

test('rejects malformed or non-canonical numerals', () => {
  for (const value of ['', 'IIII', 'IC', 'MCMC', 'abc', 'MMMM']) {
    assert.throws(() => fromRoman(value), RangeError);
  }
  assert.throws(() => fromRoman(null), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts standard additive and subtractive numerals', () => {
  assert.equal(toRoman(3), 'III');
  assert.equal(toRoman(49), 'XLIX');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(fromRoman('MCMXCIV'), 1994);
});

test('round trips all values in the supported range', () => {
  for (let number = 1; number <= 3999; number++) {
    assert.equal(fromRoman(toRoman(number)), number);
  }
});

test('rejects out-of-range and non-integer values', () => {
  for (const number of [0, -1, 4000, 1.5, NaN, Infinity]) {
    assert.throws(() => toRoman(number), RangeError);
  }
});

test('rejects empty, noncanonical and invalid numerals', () => {
  for (const value of ['', 'IIII', 'IC', 'VX', 'MMMM', 'iv', 'X!', null]) {
    assert.throws(() => fromRoman(value), RangeError);
  }
});

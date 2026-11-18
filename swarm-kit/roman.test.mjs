import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts integers to Roman numerals', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(4), 'IV');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
});

test('converts Roman numerals back to integers', () => {
  assert.equal(fromRoman('IX'), 9);
  assert.equal(fromRoman('MCMXCIV'), 1994);
  assert.equal(fromRoman('MMMCMXCIX'), 3999);
});

test('round-trips every value from 1 to 3999', () => {
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)), n);
});

test('rejects out-of-range and invalid input', () => {
  assert.throws(() => toRoman(0), RangeError);
  assert.throws(() => toRoman(4000), RangeError);
  assert.throws(() => toRoman(2.5), RangeError);
  assert.throws(() => fromRoman('IIII'), RangeError);
  assert.throws(() => fromRoman(''), RangeError);
});

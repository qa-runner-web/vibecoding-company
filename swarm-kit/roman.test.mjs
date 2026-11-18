import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('converts including subtractive forms and boundaries', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
  assert.equal(fromRoman('MCMXCIV'), 1994);
});

test('round-trips every supported integer', () => {
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)), n);
});

test('rejects invalid numbers and noncanonical numerals', () => {
  for (const n of [0, -1, 4000, 1.5, NaN, '1']) assert.throws(() => toRoman(n), RangeError);
  for (const roman of ['', 'IIII', 'IC', 'MMMM', 'iv', null]) assert.throws(() => fromRoman(roman), RangeError);
});

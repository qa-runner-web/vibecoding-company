import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';

test('toRoman converts known integers', () => {
  assert.equal(toRoman(1), 'I');
  assert.equal(toRoman(4), 'IV');
  assert.equal(toRoman(9), 'IX');
  assert.equal(toRoman(14), 'XIV');
  assert.equal(toRoman(1994), 'MCMXCIV');
  assert.equal(toRoman(3999), 'MMMCMXCIX');
});

test('fromRoman parses known numerals', () => {
  assert.equal(fromRoman('III'), 3);
  assert.equal(fromRoman('XLII'), 42);
  assert.equal(fromRoman('MCMXCIV'), 1994);
});

test('round trip holds for every integer from 1 to 3999', () => {
  for (let n = 1; n <= 3999; n++) {
    assert.equal(fromRoman(toRoman(n)), n);
  }
});

test('out-of-range and invalid input is rejected', () => {
  assert.throws(() => toRoman(0), RangeError);
  assert.throws(() => toRoman(4000), RangeError);
  assert.throws(() => toRoman(2.5), RangeError);
  assert.throws(() => fromRoman('IIII'), SyntaxError);
  assert.throws(() => fromRoman('ABC'), SyntaxError);
  assert.throws(() => fromRoman(''), SyntaxError);
});

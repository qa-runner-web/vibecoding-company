import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('returns an in-range value, including bounds', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('limits values outside the interval', () => {
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(4, 2, 2), 2);
});

test('rejects inverted bounds and invalid numbers', () => {
  assert.throws(() => clamp(1, 3, 2), RangeError);
  assert.throws(() => clamp(NaN, 0, 1), TypeError);
  assert.throws(() => clamp('1', 0, 1), TypeError);
});

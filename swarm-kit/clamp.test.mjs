import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('keeps values inside the inclusive bounds', () => {
  assert.equal(clamp(3, 1, 5), 3);
  assert.equal(clamp(1, 1, 5), 1);
  assert.equal(clamp(5, 1, 5), 5);
});

test('limits values outside the bounds', () => {
  assert.equal(clamp(-10, -2, 4), -2);
  assert.equal(clamp(10, -2, 4), 4);
  assert.equal(clamp(10, 2, 2), 2);
});

test('supports infinite bounds', () => {
  assert.equal(clamp(7, -Infinity, Infinity), 7);
});

test('rejects invalid bounds and non-numbers', () => {
  assert.throws(() => clamp(1, 2, 0), RangeError);
  assert.throws(() => clamp(NaN, 0, 2), TypeError);
  assert.throws(() => clamp(1, '0', 2), TypeError);
});

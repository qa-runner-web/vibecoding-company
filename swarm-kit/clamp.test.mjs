import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('retains values within the inclusive interval', () => {
  assert.equal(clamp(5, 1, 10), 5);
  assert.equal(clamp(1, 1, 10), 1);
  assert.equal(clamp(10, 1, 10), 10);
});

test('clips values outside the interval', () => {
  assert.equal(clamp(-9, -3, 2), -3);
  assert.equal(clamp(20, -3, 2), 2);
});

test('supports equal and infinite bounds', () => {
  assert.equal(clamp(7, 3, 3), 3);
  assert.equal(clamp(7, -Infinity, Infinity), 7);
});

test('rejects non-numbers, NaN, and reversed bounds', () => {
  assert.throws(() => clamp(1, 3, 2), RangeError);
  assert.throws(() => clamp(NaN, 1, 2), TypeError);
  assert.throws(() => clamp('1', 1, 2), TypeError);
});

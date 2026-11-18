import { test } from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('generates an ascending half-open range', () => {
  assert.deepEqual(range(1, 5), [1, 2, 3, 4]);
  assert.deepEqual(range(1, 7, 2), [1, 3, 5]);
});

test('supports descending ranges with a negative step', () => {
  assert.deepEqual(range(5, -1, -2), [5, 3, 1]);
});

test('returns empty when the direction cannot reach the end', () => {
  assert.deepEqual(range(2, 2), []);
  assert.deepEqual(range(5, 1), []);
  assert.deepEqual(range(1, 5, -1), []);
});

test('rejects zero, fractional and unsafe steps or bounds', () => {
  assert.throws(() => range(0, 5, 0), RangeError);
  assert.throws(() => range(0, 5, 0.5), RangeError);
  assert.throws(() => range(0, Infinity), RangeError);
  assert.throws(() => range(0, Number.MAX_SAFE_INTEGER + 1), RangeError);
});

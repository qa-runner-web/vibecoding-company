import { test } from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('includes the endpoint when a positive step reaches it', () => {
  assert.deepEqual(range(1, 5, 2), [1, 3, 5]);
  assert.deepEqual(range(1, 4, 2), [1, 3]);
});

test('supports descending and default steps', () => {
  assert.deepEqual(range(5, 1, -2), [5, 3, 1]);
  assert.deepEqual(range(3, 1), [3, 2, 1]);
  assert.deepEqual(range(1, 3), [1, 2, 3]);
});

test('handles equal bounds and a step facing away', () => {
  assert.deepEqual(range(2, 2, -1), [2]);
  assert.deepEqual(range(1, 3, -1), []);
  assert.deepEqual(range(3, 1, 1), []);
});

test('rejects invalid values and safely handles extreme bounds', () => {
  assert.throws(() => range(1, 3, 0), RangeError);
  assert.throws(() => range(1.5, 3), RangeError);
  assert.throws(() => range(1, Infinity), RangeError);
  assert.deepEqual(range(Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER, 2), [Number.MAX_SAFE_INTEGER - 1]);
});

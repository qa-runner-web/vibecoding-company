import test from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('includes both endpoints when the step reaches the end', () => {
  assert.deepEqual(range(1, 5, 2), [1, 3, 5]);
  assert.deepEqual(range(2, 2), [2]);
});

test('supports descending and default steps', () => {
  assert.deepEqual(range(3, 0), [3, 2, 1, 0]);
  assert.deepEqual(range(5, 0, -2), [5, 3, 1]);
});

test('returns an empty array when the step points away from the end', () => {
  assert.deepEqual(range(1, 3, -1), []);
  assert.deepEqual(range(3, 1, 1), []);
});

test('rejects zero or non-integer steps and endpoints', () => {
  assert.throws(() => range(1, 3, 0), RangeError);
  assert.throws(() => range(1, 3, 0.5), RangeError);
  assert.throws(() => range(1, Infinity), RangeError);
});

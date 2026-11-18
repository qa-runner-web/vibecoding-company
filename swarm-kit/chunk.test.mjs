import test from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('splits an array and retains a short final chunk', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('handles empty arrays and sizes larger than the input', () => {
  assert.deepEqual(chunk([], 2), []);
  assert.deepEqual(chunk([1, 2], 3), [[1, 2]]);
});

test('returns new arrays without changing the input', () => {
  const values = [1, 2, 3];
  const parts = chunk(values, 1);
  parts[0][0] = 9;
  assert.deepEqual(values, [1, 2, 3]);
});

test('rejects invalid input and chunk sizes', () => {
  assert.throws(() => chunk('abc', 1), TypeError);
  for (const size of [0, -1, 1.5, Infinity]) {
    assert.throws(() => chunk([1], size), RangeError);
  }
});

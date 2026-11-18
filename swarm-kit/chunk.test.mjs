import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('splits the array including a shorter final chunk', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('handles empty arrays and chunks larger than the input', () => {
  assert.deepEqual(chunk([], 3), []);
  assert.deepEqual(chunk([1, 2], 5), [[1, 2]]);
});

test('returns new arrays without mutating the input', () => {
  const input = [1, 2];
  const result = chunk(input, 2);
  result[0][0] = 9;
  assert.deepEqual(input, [1, 2]);
});

test('rejects non-positive or non-integer sizes', () => {
  for (const size of [0, -1, 1.5, Infinity, NaN]) assert.throws(() => chunk([1], size), RangeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('chunk splits an array into groups of n', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('chunk returns an empty array for empty input', () => {
  assert.deepEqual(chunk([], 3), []);
});

test('chunk with n larger than the array returns one group', () => {
  assert.deepEqual(chunk([1, 2], 5), [[1, 2]]);
});

test('chunk rejects a non-positive or non-integer size', () => {
  assert.throws(() => chunk([1], 0), RangeError);
  assert.throws(() => chunk([1], 1.5), RangeError);
});

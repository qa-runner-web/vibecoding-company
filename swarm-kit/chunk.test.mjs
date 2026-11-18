import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('splits into chunks of the given size', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('returns an empty array for empty input', () => {
  assert.deepEqual(chunk([], 3), []);
});

test('size larger than the input gives one chunk', () => {
  assert.deepEqual(chunk([1, 2], 10), [[1, 2]]);
});

test('rejects a non-positive size', () => {
  assert.throws(() => chunk([1], 0), RangeError);
});

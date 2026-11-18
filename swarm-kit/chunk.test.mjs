import { test } from 'node:test';
import assert from 'node:assert/strict';
import chunk, { chunk as namedChunk } from './chunk.mjs';

test('splits into chunks and retains a shorter final chunk', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(namedChunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
});

test('handles an empty array or a size larger than the input', () => {
  assert.deepEqual(chunk([], 2), []);
  assert.deepEqual(chunk([1, 2], 8), [[1, 2]]);
});

test('does not mutate or return the input array', () => {
  const values = [1, 2];
  const result = chunk(values, 8);
  result[0].push(3);
  assert.deepEqual(values, [1, 2]);
});

test('rejects invalid arrays and chunk sizes', () => {
  assert.throws(() => chunk('abc', 2), TypeError);
  for (const size of [0, -1, 1.5, NaN, Infinity]) {
    assert.throws(() => chunk([1], size), RangeError);
  }
});

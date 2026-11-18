import test from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('splits into full chunks and a final remainder', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('handles empty and oversized inputs', () => {
  assert.deepEqual(chunk([], 2), []);
  assert.deepEqual(chunk([1, 2], 3), [[1, 2]]);
});

test('creates new chunk arrays without mutating the input', () => {
  const input = [1, 2, 3];
  const result = chunk(input, 1);
  result[0][0] = 9;
  assert.deepEqual(input, [1, 2, 3]);
});

test('rejects invalid sizes and non-array inputs', () => {
  for (const size of [0, -1, 1.5, Infinity]) {
    assert.throws(() => chunk([1], size), RangeError);
  }
  assert.throws(() => chunk('abc', 2), TypeError);
});

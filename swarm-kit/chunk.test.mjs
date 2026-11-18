import test from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';

test('splits into consecutive chunks including a shorter remainder', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('handles empty input and a size larger than the array', () => {
  assert.deepEqual(chunk([], 3), []);
  assert.deepEqual(chunk([1, 2], 10), [[1, 2]]);
});

test('does not mutate the input', () => {
  const values = [1, 2, 3];
  const chunks = chunk(values, 1);
  chunks[0][0] = 99;
  assert.deepEqual(values, [1, 2, 3]);
});

test('rejects invalid sizes and non-array input', () => {
  for (const size of [0, -1, 1.5, Infinity]) {
    assert.throws(() => chunk([1], size), RangeError);
  }
  assert.throws(() => chunk('abc', 1), TypeError);
});

// Additional coverage retained from the integration branch.
test('splits an array into consecutive chunks including a remainder', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('handles empty arrays and sizes larger than the input', () => {
  assert.deepEqual(chunk([], 2), []);
  assert.deepEqual(chunk([1, 2], 10), [[1, 2]]);
});

test('does not mutate the original array', () => {
  const values = [1, 2, 3];
  const result = chunk(values, 2);
  result[0].push(4);
  assert.deepEqual(values, [1, 2, 3]);
});

test('rejects invalid chunk sizes', () => {
  for (const size of [0, -1, 1.5, Infinity, NaN]) {
    assert.throws(() => chunk([1, 2], size), RangeError);
  }
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs elements of equal-length arrays', () => {
  assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]);
});

test('stops at the shorter array', () => {
  assert.deepEqual(zip([1, 2, 3, 4], ['a', 'b']), [[1, 'a'], [2, 'b']]);
  assert.deepEqual(zip([1], ['a', 'b', 'c']), [[1, 'a']]);
});

test('empty input gives an empty result', () => {
  assert.deepEqual(zip([], [1, 2]), []);
  assert.deepEqual(zip([1, 2], []), []);
});

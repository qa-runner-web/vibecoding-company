import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs elements by index', () => {
  assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]);
});

test('stops at the shorter array', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([], ['a']), []);
});

test('returns an empty array for two empty inputs', () => {
  assert.deepEqual(zip([], []), []);
});

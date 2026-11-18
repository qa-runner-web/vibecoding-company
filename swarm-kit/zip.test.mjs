import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs values at corresponding indices', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter input in either order', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
});

test('returns an empty array when either input is empty', () => {
  assert.deepEqual(zip([], [1]), []);
  assert.deepEqual(zip([1], []), []);
});

test('does not change its input arrays', () => {
  const a = [1, 2], b = ['a'];
  zip(a, b);
  assert.deepEqual(a, [1, 2]);
  assert.deepEqual(b, ['a']);
});

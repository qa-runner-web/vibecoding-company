import test from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs elements in their original order', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter array regardless of argument order', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
});

test('returns an empty array if either input is empty', () => {
  assert.deepEqual(zip([], [1]), []);
  assert.deepEqual(zip([1], []), []);
});

test('leaves inputs untouched and rejects non-arrays', () => {
  const first = [1, 2];
  const second = [3, 4];
  zip(first, second);
  assert.deepEqual(first, [1, 2]);
  assert.deepEqual(second, [3, 4]);
  assert.throws(() => zip('ab', [1, 2]), TypeError);
});

// Additional coverage retained from the integration branch.
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

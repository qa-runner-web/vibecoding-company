import test from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs corresponding values', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter input in either order', () => {
  assert.deepEqual(zip([1, 2], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
});

test('returns no pairs for an empty input', () => {
  assert.deepEqual(zip([], [1]), []);
  assert.deepEqual(zip([1], []), []);
});

test('does not mutate inputs and rejects non-arrays', () => {
  const left = [1, 2];
  const right = ['a', 'b'];
  zip(left, right);
  assert.deepEqual(left, [1, 2]);
  assert.deepEqual(right, ['a', 'b']);
  assert.throws(() => zip(left, null), TypeError);
});

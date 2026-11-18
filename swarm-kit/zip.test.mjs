import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs corresponding entries', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter array and handles empties', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
  assert.deepEqual(zip([], [1]), []);
});

test('does not mutate its inputs and retains undefined entries', () => {
  const left = [undefined, 2];
  const right = [null, 3];
  assert.deepEqual(zip(left, right), [[undefined, null], [2, 3]]);
  assert.deepEqual(left, [undefined, 2]);
  assert.deepEqual(right, [null, 3]);
});

test('rejects non-array inputs', () => {
  assert.throws(() => zip('abc', []), TypeError);
  assert.throws(() => zip([], null), TypeError);
});

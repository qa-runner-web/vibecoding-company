import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs corresponding entries', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter array regardless of side', () => {
  assert.deepEqual(zip([1, 2], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
});

test('returns an empty array if either input is empty', () => {
  assert.deepEqual(zip([], [1]), []);
  assert.deepEqual(zip([1], []), []);
});

test('does not mutate the inputs', () => {
  const left = [1, 2];
  const right = ['a'];
  zip(left, right);
  assert.deepEqual(left, [1, 2]);
  assert.deepEqual(right, ['a']);
});

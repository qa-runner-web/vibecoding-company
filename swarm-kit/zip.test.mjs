import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs elements by index', () => {
  assert.deepEqual(zip([1, 2, 3], ['a', 'b', 'c']), [[1, 'a'], [2, 'b'], [3, 'c']]);
});

test('stops at the shorter array', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([], [1, 2]), []);
});

test('returns pairs as new arrays and leaves inputs unchanged', () => {
  const a = [1], b = [2];
  const out = zip(a, b);
  assert.deepEqual(out, [[1, 2]]);
  assert.deepEqual(a, [1]);
  assert.deepEqual(b, [2]);
});

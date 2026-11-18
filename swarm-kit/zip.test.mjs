import { test } from 'node:test';
import assert from 'node:assert/strict';
import zip, { zip as namedZip } from './zip.mjs';

test('pairs corresponding elements without mutating inputs', () => {
  const a = [1, 2];
  const b = ['a', 'b'];
  assert.deepEqual(zip(a, b), [[1, 'a'], [2, 'b']]);
  assert.deepEqual(a, [1, 2]);
  assert.deepEqual(b, ['a', 'b']);
});

test('stops at the shorter array regardless of argument order', () => {
  assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]);
  assert.deepEqual(namedZip([1], ['a', 'b']), [[1, 'a']]);
});

test('returns no pairs if either array is empty', () => {
  assert.deepEqual(zip([], [1]), []);
  assert.deepEqual(zip([1], []), []);
});

test('rejects non-array inputs', () => {
  assert.throws(() => zip('ab', [1, 2]), TypeError);
  assert.throws(() => zip([], null), TypeError);
});

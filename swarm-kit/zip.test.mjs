import test from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';

test('pairs corresponding elements in order', () => {
  assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]);
});

test('stops at the shorter array in either order', () => {
  assert.deepEqual(zip([1, 2], ['a']), [[1, 'a']]);
  assert.deepEqual(zip([1], ['a', 'b']), [[1, 'a']]);
});

test('handles empty arrays without mutating inputs', () => {
  const values = [1, 2];
  assert.deepEqual(zip([], values), []);
  assert.deepEqual(values, [1, 2]);
});

test('rejects non-array inputs', () => {
  assert.throws(() => zip(null, []), TypeError);
  assert.throws(() => zip([], 'abc'), TypeError);
});

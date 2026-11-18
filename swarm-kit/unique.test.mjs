import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('returns distinct values in their first-seen order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('handles empty input without changing the original array', () => {
  const values = [1, 1, 2];
  assert.deepEqual(unique([]), []);
  assert.deepEqual(unique(values), [1, 2]);
  assert.deepEqual(values, [1, 1, 2]);
});

test('uses Set equality for NaN and object references', () => {
  const first = {};
  const second = {};
  assert.deepEqual(unique([NaN, NaN, first, first, second]), [NaN, first, second]);
});

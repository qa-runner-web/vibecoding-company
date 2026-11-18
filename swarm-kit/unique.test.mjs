import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicates while preserving first occurrence order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('returns an empty array for an empty input', () => {
  assert.deepEqual(unique([]), []);
});

test('uses value equality for NaN and reference equality for objects', () => {
  const first = {};
  const second = {};
  assert.deepEqual(unique([NaN, NaN, first, second, first]), [NaN, first, second]);
});

test('does not mutate the input', () => {
  const input = [1, 1, 2];
  assert.deepEqual(unique(input), [1, 2]);
  assert.deepEqual(input, [1, 1, 2]);
});

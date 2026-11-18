import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicates while preserving first occurrence order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('returns an empty array for empty input', () => {
  assert.deepEqual(unique([]), []);
});

test('uses SameValueZero equality and object identity', () => {
  const object = {};
  const other = {};
  assert.deepEqual(unique([NaN, NaN, object, object, other]), [NaN, object, other]);
});

test('does not mutate its input', () => {
  const input = [1, 1, 2];
  unique(input);
  assert.deepEqual(input, [1, 1, 2]);
});

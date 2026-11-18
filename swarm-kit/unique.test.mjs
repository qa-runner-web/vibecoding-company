import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicates', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);
});

test('keeps first-occurrence order', () => {
  assert.deepEqual(unique(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
});

test('treats NaN as equal to itself', () => {
  assert.deepEqual(unique([NaN, NaN, 1]), [NaN, 1]);
});

test('empty array gives empty array and does not mutate input', () => {
  const xs = [1, 1];
  assert.deepEqual(unique([]), []);
  unique(xs);
  assert.deepEqual(xs, [1, 1]);
});

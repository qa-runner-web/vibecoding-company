import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicates', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);
});

test('keeps first-seen order', () => {
  assert.deepEqual(unique(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
});

test('returns an empty array for empty input', () => {
  assert.deepEqual(unique([]), []);
});

test('does not mutate the input', () => {
  const input = [1, 1, 2];
  unique(input);
  assert.deepEqual(input, [1, 1, 2]);
});

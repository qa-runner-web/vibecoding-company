import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicates and keeps first-seen order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('leaves an array without duplicates unchanged', () => {
  assert.deepEqual(unique(['a', 'b', 'c']), ['a', 'b', 'c']);
});

test('handles empty input and does not mutate the input', () => {
  assert.deepEqual(unique([]), []);
  const input = [1, 1, 2];
  unique(input);
  assert.deepEqual(input, [1, 1, 2]);
});

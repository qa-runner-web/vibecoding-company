import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('removes duplicate numbers', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);
});

test('keeps first-occurrence order', () => {
  assert.deepEqual(unique(['b', 'a', 'b', 'c', 'a']), ['b', 'a', 'c']);
});

test('handles empty and already-unique arrays', () => {
  assert.deepEqual(unique([]), []);
  assert.deepEqual(unique([4, 5, 6]), [4, 5, 6]);
});

test('does not mutate the input', () => {
  const input = [1, 1, 2];
  unique(input);
  assert.deepEqual(input, [1, 1, 2]);
});

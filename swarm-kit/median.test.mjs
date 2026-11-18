import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('odd length returns the middle value', () => {
  assert.equal(median([3, 1, 2]), 2);
});

test('even length averages the two middle values', () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test('does not mutate the input', () => {
  const input = [5, 1, 3];
  median(input);
  assert.deepEqual(input, [5, 1, 3]);
});

test('throws on an empty array', () => {
  assert.throws(() => median([]), RangeError);
});

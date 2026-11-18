import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('odd length returns the middle value', () => {
  assert.equal(median([3, 1, 2]), 2);
});

test('even length averages the two middle values', () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test('does not mutate its input and handles one element', () => {
  const xs = [5, 1, 9];
  assert.equal(median(xs), 5);
  assert.deepEqual(xs, [5, 1, 9]);
  assert.equal(median([7]), 7);
});

test('rejects empty input', () => {
  assert.throws(() => median([]), RangeError);
});

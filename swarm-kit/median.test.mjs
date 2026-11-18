import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('median of an odd-length array is the middle value', () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([5]), 5);
});

test('median of an even-length array averages the two middle values', () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test('median does not mutate its input', () => {
  const input = [9, 1, 5];
  median(input);
  assert.deepEqual(input, [9, 1, 5]);
});

test('median rejects empty input', () => {
  assert.throws(() => median([]), RangeError);
});

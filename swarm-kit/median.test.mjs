import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('odd-length array returns the middle value', () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([7]), 7);
});

test('even-length array returns the mean of the two middle values', () => {
  assert.equal(median([1, 2, 3, 4]), 2.5);
  assert.equal(median([4, 1]), 2.5);
});

test('input is not mutated and negatives work', () => {
  const xs = [5, -3, 0, 2];
  assert.equal(median(xs), 1);
  assert.deepEqual(xs, [5, -3, 0, 2]);
});

test('empty input is rejected', () => {
  assert.throws(() => median([]), RangeError);
});

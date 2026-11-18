import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('finds the middle of unsorted odd-length inputs', () => {
  assert.equal(median([9, 1, 4]), 4);
  assert.equal(median([7]), 7);
});

test('averages the middle values for even-length inputs', () => {
  assert.equal(median([6, -2, 4, 0]), 2);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
  assert.equal(median([-Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  assert.equal(median([Number.MIN_VALUE, Number.MIN_VALUE]), Number.MIN_VALUE);
});

test('does not sort the caller’s array', () => {
  const input = [3, 1, 2];
  median(input);
  assert.deepEqual(input, [3, 1, 2]);
});

test('rejects empty or non-finite inputs', () => {
  assert.throws(() => median([]), RangeError);
  assert.throws(() => median([1, NaN]), RangeError);
  assert.throws(() => median([Infinity]), RangeError);
});

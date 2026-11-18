import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('finds the middle value of an unsorted odd-length array', () => {
  assert.equal(median([9, 1, 5]), 5);
  assert.equal(median([7]), 7);
});

test('averages the middle values for an even-length array', () => {
  assert.equal(median([10, 2, 4, 8]), 6);
  assert.equal(median([-Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
});

test('leaves the original array unchanged', () => {
  const values = [4, 2, 3];
  median(values);
  assert.deepEqual(values, [4, 2, 3]);
});

test('rejects empty arrays and non-finite values', () => {
  for (const values of [[], [NaN], [Infinity], [1, '2']]) {
    assert.throws(() => median(values), RangeError);
  }
});

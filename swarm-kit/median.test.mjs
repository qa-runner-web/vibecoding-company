import { test } from 'node:test';
import assert from 'node:assert/strict';
import median, { median as namedMedian } from './median.mjs';

test('returns the middle value of an odd-length array without mutating it', () => {
  const values = [9, 1, 3];
  assert.equal(median(values), 3);
  assert.deepEqual(values, [9, 1, 3]);
  assert.equal(namedMedian([42]), 42);
});

test('averages the two middle values of an even-length array', () => {
  assert.equal(median([10, 2, 4, 8]), 6);
  assert.equal(median([-5, -2]), -3.5);
  assert.equal(median([-Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
});

test('handles duplicate values and decimal numbers', () => {
  assert.equal(median([2.5, 2.5, 1, 7, 2.5]), 2.5);
});

test('rejects empty arrays and non-finite or non-numeric values', () => {
  assert.throws(() => median([]), RangeError);
  for (const input of [null, '123', [1, NaN], [Infinity], [1, '2'], Array(2)]) {
    assert.throws(() => median(input), TypeError);
  }
});

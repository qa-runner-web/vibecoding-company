import test from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('returns the middle number for an odd-length array', () => {
  assert.equal(median([9, 1, 3]), 3);
  assert.equal(median([7]), 7);
});

test('averages the middle values for an even-length array', () => {
  assert.equal(median([20, 2, 10, 4]), 7);
  assert.equal(median([-4, -2]), -3);
});

test('does not reorder the input', () => {
  const values = [3, 1, 2];
  median(values);
  assert.deepEqual(values, [3, 1, 2]);
});

test('handles large values without intermediate overflow', () => {
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
  assert.equal(median([-Number.MAX_VALUE, Number.MAX_VALUE]), 0);
});

test('rejects empty arrays and non-finite values', () => {
  assert.throws(() => median([]), RangeError);
  assert.throws(() => median([1, NaN]), TypeError);
  assert.throws(() => median([1, Infinity]), TypeError);
  assert.throws(() => median([1, '2']), TypeError);
  assert.throws(() => median(new Array(1)), TypeError);
});

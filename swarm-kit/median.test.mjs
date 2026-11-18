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
  assert.equal(median([-Number.MIN_VALUE, 2 * Number.MIN_VALUE]), 0);
});

test('rejects empty arrays and non-finite values', () => {
  assert.throws(() => median([]), RangeError);
  assert.throws(() => median([1, NaN]), TypeError);
  assert.throws(() => median([1, Infinity]), TypeError);
  assert.throws(() => median([1, '2']), TypeError);
  assert.throws(() => median(new Array(1)), TypeError);
});

// Additional coverage retained from the integration branch.
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
  assert.throws(() => median([]), RangeError);
  for (const values of [[NaN], [Infinity], [1, '2']]) {
    assert.throws(() => median(values), TypeError);
  }
});

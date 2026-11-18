import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('finds the middle of an unsorted odd-length array without mutation', () => {
  const values = [10, 2, -4, 7, 1];
  assert.equal(median(values), 2);
  assert.deepEqual(values, [10, 2, -4, 7, 1]);
});

test('averages the middle of an even-length array', () => {
  assert.equal(median([4, 1, 8, 2]), 3);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
});

test('returns undefined for no values and the value for one element', () => {
  assert.equal(median([]), undefined);
  assert.equal(median([-3]), -3);
});

test('rejects non-array and non-finite inputs', () => {
  assert.throws(() => median(null), TypeError);
  assert.throws(() => median([1, NaN]), TypeError);
  assert.throws(() => median([Infinity]), TypeError);
  assert.throws(() => median([1, '2']), TypeError);
});

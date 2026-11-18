import { test } from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('finds the middle value of an unsorted odd-length array without mutation', () => {
  const input = [9, 1, 5];
  assert.equal(median(input), 5);
  assert.deepEqual(input, [9, 1, 5]);
});

test('averages the two middle values for even-length arrays', () => {
  assert.equal(median([8, -2, 4, 2]), 3);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
});

test('returns the only element of a singleton array', () => {
  assert.equal(median([42]), 42);
});

test('rejects empty arrays and non-finite or non-number entries', () => {
  assert.throws(() => median([]), RangeError);
  assert.throws(() => median([1, NaN]), TypeError);
  assert.throws(() => median([1, '2']), TypeError);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { median } from './median.mjs';

test('finds the middle value without mutating the input', () => {
  const values = [10, -4, 2];
  assert.equal(median(values), 2);
  assert.deepEqual(values, [10, -4, 2]);
});

test('averages the two middle values in an even-length array', () => {
  assert.equal(median([8, 3, 1, 6]), 4.5);
  assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
  assert.equal(median([Number.MIN_VALUE, Number.MIN_VALUE]), Number.MIN_VALUE);
  assert.equal(median([-Number.MAX_VALUE, Number.MAX_VALUE]), 0);
});

test('returns the single value for a one-element array', () => {
  assert.equal(median([42]), 42);
});

test('rejects empty and invalid arrays', () => {
  assert.throws(() => median([]), RangeError);
  assert.throws(() => median([1, NaN]), TypeError);
  assert.throws(() => median('1'), TypeError);
});

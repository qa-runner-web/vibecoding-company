import { test } from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('counts up with the default step', () => {
  assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4]);
});

test('uses a custom positive step', () => {
  assert.deepEqual(range(1, 10, 3), [1, 4, 7]);
});

test('counts down with a negative step', () => {
  assert.deepEqual(range(5, 0, -2), [5, 3, 1]);
});

test('returns an empty array when the range is empty', () => {
  assert.deepEqual(range(3, 3), []);
  assert.deepEqual(range(0, 5, -1), []);
});

test('rejects a zero step', () => {
  assert.throws(() => range(0, 5, 0), RangeError);
});

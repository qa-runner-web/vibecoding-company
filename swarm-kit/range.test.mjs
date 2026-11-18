import { test } from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('counts up from a to b, excluding b', () => {
  assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4]);
});

test('honours a positive step', () => {
  assert.deepEqual(range(0, 10, 3), [0, 3, 6, 9]);
});

test('counts down with a negative step', () => {
  assert.deepEqual(range(5, 0, -2), [5, 3, 1]);
});

test('empty when the range is empty or the step points away', () => {
  assert.deepEqual(range(3, 3), []);
  assert.deepEqual(range(0, 5, -1), []);
});

test('rejects a zero step', () => {
  assert.throws(() => range(0, 5, 0), RangeError);
});

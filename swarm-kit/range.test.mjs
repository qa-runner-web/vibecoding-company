import { test } from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('returns an inclusive ascending sequence by default', () => {
  assert.deepEqual(range(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(range(2, 2), [2]);
});

test('supports steps in either direction', () => {
  assert.deepEqual(range(1, 6, 2), [1, 3, 5]);
  assert.deepEqual(range(5, 1, -2), [5, 3, 1]);
  assert.deepEqual(range(3, 1), [3, 2, 1]);
});

test('returns empty when the step points away from the end', () => {
  assert.deepEqual(range(1, 5, -1), []);
  assert.deepEqual(range(5, 1, 1), []);
});

test('rejects zero or non-integer steps and unsafe endpoints', () => {
  assert.throws(() => range(1, 3, 0), RangeError);
  assert.throws(() => range(1, 3, 0.5), RangeError);
  assert.throws(() => range(1, Infinity), RangeError);
});

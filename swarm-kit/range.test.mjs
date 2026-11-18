import test from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('returns ascending and descending inclusive ranges by default', () => {
  assert.deepEqual(range(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(range(3, 1), [3, 2, 1]);
  assert.deepEqual(range(3, 3), [3]);
});

test('uses a step and stops before passing the end', () => {
  assert.deepEqual(range(0, 5, 2), [0, 2, 4]);
  assert.deepEqual(range(5, 1, -2), [5, 3, 1]);
});

test('returns an empty array for a step pointing away from the end', () => {
  assert.deepEqual(range(1, 5, -1), []);
  assert.deepEqual(range(5, 1, 1), []);
});

test('rejects zero, fractional, and unsafe values', () => {
  assert.throws(() => range(1, 3, 0), RangeError);
  assert.throws(() => range(1, 3, 0.5), RangeError);
  assert.throws(() => range(0, Number.MAX_SAFE_INTEGER + 1), RangeError);
});

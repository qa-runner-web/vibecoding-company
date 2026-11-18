import { test } from 'node:test';
import assert from 'node:assert/strict';
import range, { range as namedRange } from './range.mjs';

test('includes reachable endpoints with the default direction', () => {
  assert.deepEqual(range(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(namedRange(3, 1), [3, 2, 1]);
  assert.deepEqual(range(2, 2), [2]);
});

test('supports explicit positive and negative steps', () => {
  assert.deepEqual(range(1, 6, 2), [1, 3, 5]);
  assert.deepEqual(range(5, -1, -3), [5, 2, -1]);
});

test('returns empty when the step points away from the end', () => {
  assert.deepEqual(range(1, 5, -1), []);
  assert.deepEqual(range(5, 1, 1), []);
});

test('rejects zero, fractional, or unsafe integers', () => {
  for (const args of [[0, 3, 0], [0, 3, 0.5], [0, Infinity], [0, Number.MAX_SAFE_INTEGER + 1]]) {
    assert.throws(() => range(...args), RangeError);
  }
  assert.deepEqual(range(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 2), [Number.MAX_SAFE_INTEGER]);
});

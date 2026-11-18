import test from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';

test('generates an inclusive ascending range', () => {
  assert.deepEqual(range(1, 4), [1, 2, 3, 4]);
  assert.deepEqual(range(1, 6, 2), [1, 3, 5]);
});

test('generates descending ranges using a negative step', () => {
  assert.deepEqual(range(3, 0), [3, 2, 1, 0]);
  assert.deepEqual(range(5, 1, -2), [5, 3, 1]);
});

test('handles a single value and a step pointing away from the end', () => {
  assert.deepEqual(range(2, 2), [2]);
  assert.deepEqual(range(1, 5, -1), []);
  assert.deepEqual(range(5, 1, 1), []);
});

test('rejects zero steps and non-safe integers', () => {
  assert.throws(() => range(1, 3, 0), RangeError);
  assert.throws(() => range(1.5, 3), RangeError);
  assert.throws(() => range(0, Infinity), RangeError);
});

test('terminates at safe integer boundaries', () => {
  assert.deepEqual(range(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER), [Number.MAX_SAFE_INTEGER]);
  assert.deepEqual(range(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, -1), [Number.MIN_SAFE_INTEGER]);
});

// Additional coverage retained from the integration branch.
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

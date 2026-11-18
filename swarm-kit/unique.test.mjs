import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('retains the first occurrence of each value in order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('returns a new empty array for empty input', () => {
  const values = [];
  const result = unique(values);
  assert.deepEqual(result, []);
  assert.notEqual(result, values);
});

test('uses object identity and SameValueZero equality', () => {
  const object = {};
  const other = {};
  assert.deepEqual(unique([object, object, other, NaN, NaN, 0, -0]), [object, other, NaN, 0]);
});

test('does not mutate the input', () => {
  const values = ['a', 'b', 'a'];
  assert.deepEqual(unique(values), ['a', 'b']);
  assert.deepEqual(values, ['a', 'b', 'a']);
});

// Additional coverage retained from the integration branch.
test('removes duplicates while retaining first-occurrence order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('returns a new empty array for empty input', () => {
  const input = [];
  const result = unique(input);
  assert.deepEqual(result, []);
  assert.notEqual(result, input);
});

test('uses value equality for NaN and reference identity for objects', () => {
  const object = {};
  const other = {};
  assert.deepEqual(unique([NaN, NaN, object, other, object]), [NaN, object, other]);
});

test('does not mutate its input', () => {
  const input = ['a', 'a', 'b'];
  unique(input);
  assert.deepEqual(input, ['a', 'a', 'b']);
});

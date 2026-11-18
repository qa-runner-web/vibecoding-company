import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

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

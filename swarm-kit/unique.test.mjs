import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('keeps the first occurrence of each value in order', () => {
  const input = [3, 1, 3, 2, 1];
  assert.deepEqual(unique(input), [3, 1, 2]);
  assert.deepEqual(input, [3, 1, 3, 2, 1]);
});

test('returns a new empty array for empty input', () => {
  const input = [];
  assert.deepEqual(unique(input), []);
  assert.notEqual(unique(input), input);
});

test('uses Set equality for NaN and object references', () => {
  const object = {};
  const other = {};
  assert.deepEqual(unique([NaN, NaN, object, object, other]), [NaN, object, other]);
});

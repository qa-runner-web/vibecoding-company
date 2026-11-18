import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';

test('keeps first occurrences in order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});

test('handles an empty array without mutating the input', () => {
  const input = [];
  const result = unique(input);
  assert.deepEqual(result, []);
  assert.notEqual(result, input);
});

test('uses identity for objects and SameValueZero for numbers', () => {
  const object = {};
  const another = {};
  assert.deepEqual(unique([object, object, another, NaN, NaN, 0, -0]), [object, another, NaN, 0]);
});

test('does not mutate a populated input', () => {
  const input = ['a', 'b', 'a'];
  assert.deepEqual(unique(input), ['a', 'b']);
  assert.deepEqual(input, ['a', 'b', 'a']);
});

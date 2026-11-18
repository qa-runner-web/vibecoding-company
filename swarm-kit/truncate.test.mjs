import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('returns strings that fit without an ellipsis', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('', 2), '');
});

test('includes the ellipsis in the maximum length', () => {
  assert.equal(truncate('hello world', 5), 'hell…');
  assert.equal(truncate('hello', 1), '…');
  assert.equal(truncate('hello', 0), '');
});

test('does not split supplementary Unicode characters', () => {
  assert.equal(truncate('a😀bc', 3), 'a😀…');
});

test('rejects invalid lengths', () => {
  for (const n of [-1, 1.5, NaN, Infinity]) assert.throws(() => truncate('abc', n), RangeError);
});

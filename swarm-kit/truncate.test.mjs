import { test } from 'node:test';
import assert from 'node:assert/strict';
import truncate, { truncate as namedTruncate } from './truncate.mjs';

test('leaves strings within the limit unchanged', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('', 0), '');
  assert.equal(namedTruncate('hi', 10), 'hi');
});

test('includes the ellipsis within the maximum length', () => {
  assert.equal(truncate('hello world', 8), 'hello...');
  assert.equal(truncate('hello', 3), '...');
  assert.equal(truncate('hello', 2), '..');
  assert.equal(truncate('hello', 0), '');
});

test('does not split Unicode code points', () => {
  assert.equal(truncate('😀abcd', 4), '😀...');
});

test('rejects invalid inputs', () => {
  assert.throws(() => truncate(null, 3), TypeError);
  for (const length of [-1, 1.5, NaN, Infinity]) {
    assert.throws(() => truncate('abc', length), RangeError);
  }
});

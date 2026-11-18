import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('keeps text that fits exactly or is shorter', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('hi', 5), 'hi');
});

test('includes the ellipsis within the maximum length', () => {
  assert.equal(truncate('hello', 4), 'hel…');
  assert.equal(truncate('hello', 1), '…');
  assert.equal(truncate('hello', 0), '');
});

test('does not split a Unicode code point', () => {
  assert.equal(truncate('😀abc', 3), '😀a…');
});

test('rejects invalid inputs', () => {
  assert.throws(() => truncate(null, 3), TypeError);
  for (const size of [-1, 1.5, NaN, Infinity]) {
    assert.throws(() => truncate('hello', size), RangeError);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('preserves strings that fit', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('', 0), '');
});

test('includes the ellipsis within the requested length', () => {
  assert.equal(truncate('hello world', 6), 'hello…');
  assert.equal(truncate('hello', 1), '…');
  assert.equal(truncate('hello', 0), '');
});

test('does not split Unicode code points', () => {
  assert.equal(truncate('😀😃😄', 2), '😀…');
});

test('rejects invalid inputs', () => {
  assert.throws(() => truncate(null, 2), TypeError);
  for (const length of [-1, 1.5, NaN, Infinity]) {
    assert.throws(() => truncate('hello', length), RangeError);
  }
});

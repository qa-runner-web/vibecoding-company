import test from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('leaves strings at or below the limit unchanged', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('hi', 5), 'hi');
});

test('includes an ellipsis within the limit when shortening', () => {
  assert.equal(truncate('hello world', 5), 'hell…');
  assert.equal(truncate('hello', 1), '…');
  assert.equal(truncate('hello', 0), '');
});

test('does not split Unicode surrogate pairs', () => {
  assert.equal(truncate('😀ab', 2), '😀…');
});

test('rejects invalid lengths and non-string values', () => {
  assert.throws(() => truncate('hello', -1), RangeError);
  assert.throws(() => truncate('hello', 1.5), RangeError);
  assert.throws(() => truncate(null, 1), TypeError);
});

// Additional coverage retained from the integration branch.
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

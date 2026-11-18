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

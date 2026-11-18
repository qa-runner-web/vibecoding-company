import test from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('shortens to the requested length including the ellipsis', () => {
  assert.equal(truncate('hello world', 6), 'hello…');
});

test('leaves strings at or below the limit unchanged', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('hi', 5), 'hi');
});

test('handles zero and one character limits', () => {
  assert.equal(truncate('hello', 0), '');
  assert.equal(truncate('hello', 1), '…');
});

test('does not split Unicode code points', () => {
  assert.equal(truncate('😀😃😄', 2), '😀…');
});

test('rejects invalid inputs', () => {
  assert.throws(() => truncate('hello', -1), RangeError);
  assert.throws(() => truncate('hello', 1.5), RangeError);
  assert.throws(() => truncate(null, 1), TypeError);
});

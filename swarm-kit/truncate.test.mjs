import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('returns short strings unchanged', () => {
  assert.equal(truncate('hi', 10), 'hi');
});

test('shortens long strings with an ellipsis within the limit', () => {
  const out = truncate('hello world', 8);
  assert.equal(out, 'hello...');
  assert.equal(out.length, 8);
});

test('accepts a custom ellipsis', () => {
  assert.equal(truncate('hello world', 6, '~'), 'hello~');
});

test('rejects a negative length', () => {
  assert.throws(() => truncate('x', -1), RangeError);
});

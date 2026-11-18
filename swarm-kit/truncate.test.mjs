import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('returns the string unchanged when it fits', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('hi', 10), 'hi');
});

test('cuts and appends an ellipsis within n characters', () => {
  assert.equal(truncate('hello world', 8), 'hello...');
  assert.equal(truncate('hello world', 8).length, 8);
});

test('handles very small limits', () => {
  assert.equal(truncate('hello', 3), '...');
  assert.equal(truncate('hello', 2), '..');
  assert.equal(truncate('hello', 0), '');
});

test('empty string stays empty', () => {
  assert.equal(truncate('', 5), '');
});

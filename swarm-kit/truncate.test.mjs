import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('returns the string unchanged when it fits', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('hi', 10), 'hi');
});

test('shortens to n characters including the ellipsis', () => {
  assert.equal(truncate('hello world', 8), 'hello...');
  assert.equal(truncate('hello world', 8).length, 8);
});

test('uses a custom ellipsis', () => {
  assert.equal(truncate('hello world', 7, '…'), 'hello …');
});

test('handles very small limits', () => {
  assert.equal(truncate('hello', 0), '');
  assert.equal(truncate('hello', 2), '..');
});

test('rejects invalid n', () => {
  assert.throws(() => truncate('x', -1), RangeError);
});

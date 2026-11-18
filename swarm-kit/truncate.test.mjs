import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('leaves short strings unchanged', () => {
  assert.equal(truncate('hi', 10), 'hi');
});

test('shortens long strings to n characters including the ellipsis', () => {
  assert.equal(truncate('Hello, world', 8), 'Hello...');
  assert.equal(truncate('Hello, world', 8).length, 8);
});

test('accepts a custom ellipsis', () => {
  assert.equal(truncate('Hello, world', 7, '…'), 'Hello,…');
});

test('handles n smaller than the ellipsis', () => {
  assert.equal(truncate('Hello', 2), '..');
});

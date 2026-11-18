import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';

test('leaves strings that fit unchanged', () => {
  assert.equal(truncate('hello', 5), 'hello');
  assert.equal(truncate('', 0), '');
});

test('includes the suffix within the limit', () => {
  assert.equal(truncate('hello world', 8), 'hello w…');
  assert.equal(truncate('abcdef', 4, '...'), 'a...');
  assert.equal(truncate('abcdef', 2, '...'), '..');
  assert.equal(truncate('abcdef', 0), '');
});

test('counts Unicode code points rather than UTF-16 units', () => {
  assert.equal(truncate('a😀bc', 3), 'a😀…');
  assert.equal(truncate('😀😀😀', 2, '🦊'), '😀🦊');
});

test('rejects invalid input', () => {
  assert.throws(() => truncate('abc', -1), RangeError);
  assert.throws(() => truncate('abc', 1.5), RangeError);
  assert.throws(() => truncate(42, 2), TypeError);
  assert.throws(() => truncate('abc', 2, null), TypeError);
});

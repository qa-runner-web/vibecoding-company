import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and replaces punctuation with single hyphens', () => {
  assert.equal(slugify('  Hello, World!  A test  '), 'hello-world-a-test');
});

test('normalizes accented characters and preserves other scripts', () => {
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
});

test('returns an empty string for empty or punctuation-only input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('! -- ?'), '');
});

test('rejects non-string input', () => {
  assert.throws(() => slugify(null), TypeError);
});

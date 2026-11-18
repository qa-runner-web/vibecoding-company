import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and collapses separators', () => {
  assert.equal(slugify('  Hello,   WORLD!  '), 'hello-world');
});

test('removes accents and preserves digits', () => {
  assert.equal(slugify('Crème brûlée 42'), 'creme-brulee-42');
});

test('returns an empty slug for empty or punctuation-only input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify(' !-- '), '');
});

test('rejects non-string input', () => {
  assert.throws(() => slugify(null), TypeError);
});

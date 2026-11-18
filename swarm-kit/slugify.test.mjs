import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and joins them with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('removes accents and collapses punctuation and whitespace', () => {
  assert.equal(slugify('  Crème brûlée & café!  '), 'creme-brulee-cafe');
});

test('returns an empty slug for an empty or punctuation-only string', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify(' ! -- '), '');
});

test('rejects non-string inputs', () => {
  assert.throws(() => slugify(null), TypeError);
});

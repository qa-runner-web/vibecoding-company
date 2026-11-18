import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('slugify lowercases and joins words with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('slugify removes punctuation and collapses separators', () => {
  assert.equal(slugify('  Fish & Chips!!  -- now'), 'fish-chips-now');
});

test('slugify strips accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('slugify returns an empty string when nothing is left', () => {
  assert.equal(slugify('!!!'), '');
});

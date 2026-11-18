import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and joins them with hyphens', () => {
  assert.equal(slugify('  Hello, World!  '), 'hello-world');
});

test('removes combining accents and preserves non-Latin letters', () => {
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
});

test('collapses separators and trims them from both ends', () => {
  assert.equal(slugify('---one__two / three---'), 'one-two-three');
});

test('returns an empty slug for empty or separator-only input', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify('  !@# '), '');
});

// Additional coverage retained from the integration branch.
test('lowercases words and separates them with hyphens', () => {
  assert.equal(slugify('Hello, World! 2024'), 'hello-world-2024');
});

test('folds accents into ASCII characters', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('trims and collapses separators', () => {
  assert.equal(slugify('  --A___B--  '), 'a-b');
});

test('returns an empty slug for punctuation-only input', () => {
  assert.equal(slugify(' !? '), '');
});

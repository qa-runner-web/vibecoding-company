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

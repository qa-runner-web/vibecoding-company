import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases and joins words with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('collapses punctuation and trims edge hyphens', () => {
  assert.equal(slugify('  --Hello,   World!!  '), 'hello-world');
});

test('strips accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('empty or symbol-only input gives an empty slug', () => {
  assert.equal(slugify('!!!'), '');
  assert.equal(slugify(''), '');
});

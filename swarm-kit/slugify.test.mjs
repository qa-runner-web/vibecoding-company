import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases and joins words with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('collapses punctuation and trims hyphens at the ends', () => {
  assert.equal(slugify('  Hello, --- World!  '), 'hello-world');
});

test('removes accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('returns an empty string when nothing is left', () => {
  assert.equal(slugify('!!!'), '');
});

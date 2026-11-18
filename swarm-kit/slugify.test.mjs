import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases and joins words with hyphens', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('removes punctuation and collapses separators', () => {
  assert.equal(slugify('  Hello,   world!!  '), 'hello-world');
});

test('strips accents', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('returns empty string when nothing is left', () => {
  assert.equal(slugify('!!!'), '');
});

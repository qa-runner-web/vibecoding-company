import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and separates them with hyphens', () => {
  assert.equal(slugify('Hello, World! 2024'), 'hello-world-2024');
});

test('folds accents into ASCII characters', () => {
  assert.equal(slugify('Crème Brûlée'), 'creme-brulee');
});

test('trims and collapses separators', () => {
  assert.equal(slugify('  --A___B--  '), 'a-b');
});

test('returns an empty slug when no ASCII letters or digits remain', () => {
  assert.equal(slugify(' !? '), '');
});

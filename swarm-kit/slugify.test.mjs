import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';

test('lowercases words and collapses separators', () => {
  assert.equal(slugify('  Hello,   World! '), 'hello-world');
});

test('normalizes accented and non-Latin text', () => {
  assert.equal(slugify('Crème brûlée 東京'), 'creme-brulee-東京');
});

test('returns an empty slug when no letters or numbers exist', () => {
  assert.equal(slugify(' --- !!! '), '');
  assert.equal(slugify(''), '');
});

test('keeps numbers and treats punctuation as separators', () => {
  assert.equal(slugify('Version 2.0 / release'), 'version-2-0-release');
});

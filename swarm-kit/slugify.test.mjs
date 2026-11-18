import { test } from 'node:test';
import assert from 'node:assert/strict';
import slugify, { slugify as namedSlugify } from './slugify.mjs';

test('converts words and punctuation into a URL slug', () => {
  assert.equal(slugify('  Hello, World!  '), 'hello-world');
});

test('normalizes accented Latin characters', () => {
  assert.equal(slugify('Crème brûlée déjà vu'), 'creme-brulee-deja-vu');
});

test('collapses separators and keeps digits', () => {
  assert.equal(slugify('A__B / C 123'), 'a-b-c-123');
});

test('returns an empty slug when no ASCII letters or digits remain', () => {
  assert.equal(namedSlugify(' ! '), '');
  assert.equal(namedSlugify(''), '');
});

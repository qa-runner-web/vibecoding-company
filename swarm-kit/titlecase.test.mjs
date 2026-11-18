import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('normalizes capitalization within words', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves punctuation and whitespace', () => {
  assert.equal(titlecase('hello,  WORLD!\nwell-done'), 'Hello,  World!\nWell-Done');
});

test('handles Unicode letters and internal apostrophes', () => {
  assert.equal(titlecase('ÉCOLE d’ÉTÉ and o’NEILL'), 'École D’été And O’neill');
});

test('handles empty strings and separator-only text', () => {
  assert.equal(titlecase(''), '');
  assert.equal(titlecase('... !'), '... !');
});

// Additional coverage retained from the integration branch.
test('capitalizes words and lowercases the remainder', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves whitespace and punctuation', () => {
  assert.equal(titlecase('  a\tTWO-part sentence! '), '  A\tTwo-Part Sentence! ');
});

test('handles Unicode letters and apostrophes within words', () => {
  assert.equal(titlecase('élAN O’NEILL and café'), 'Élan O’neill And Café');
});

test('handles empty strings and non-letter text', () => {
  assert.equal(titlecase(''), '');
  assert.equal(titlecase('123 !'), '123 !');
});

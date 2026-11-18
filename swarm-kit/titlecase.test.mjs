import test from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

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

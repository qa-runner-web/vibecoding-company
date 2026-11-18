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

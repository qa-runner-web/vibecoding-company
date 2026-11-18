import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('title-cases a sentence regardless of original capitalization', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves punctuation and whitespace between words', () => {
  assert.equal(titlecase('hello,  WORLD!\nwell-done'), 'Hello,  World!\nWell-Done');
});

test('handles apostrophes within words and Unicode letters', () => {
  assert.equal(titlecase('ÉCOLE d’ÉTÉ and o’NEILL'), 'École D’été And O’neill');
});

test('handles an empty string and text with only separators', () => {
  assert.equal(titlecase(''), '');
  assert.equal(titlecase('... !'), '... !');
});

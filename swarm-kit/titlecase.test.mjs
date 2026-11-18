import test from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalizes words and lowercases their remaining letters', () => {
  assert.equal(titlecase('hELLO WORLD'), 'Hello World');
});

test('preserves whitespace and punctuation', () => {
  assert.equal(titlecase('  one-two, THREE!\n'), '  One-Two, Three!\n');
});

test('handles empty strings and Unicode letters', () => {
  assert.equal(titlecase(''), '');
  assert.equal(titlecase('élAN déjà'), 'Élan Déjà');
});

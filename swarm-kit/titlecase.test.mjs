import test from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalizes words and lowercases their remaining letters', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves punctuation, spacing, and apostrophes', () => {
  assert.equal(titlecase("  don't STOP, now!"), "  Don't Stop, Now!");
});

test('handles Unicode letters and empty strings', () => {
  assert.equal(titlecase('élAN VITAL'), 'Élan Vital');
  assert.equal(titlecase(''), '');
});

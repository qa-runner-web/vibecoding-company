import test from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalizes words and lowercases remaining letters', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves punctuation and whitespace', () => {
  assert.equal(titlecase("  rock-and ROLL, don't STOP!\n"), "  Rock-And Roll, Don't Stop!\n");
});

test('handles empty input', () => {
  assert.equal(titlecase(''), '');
});

test('capitalizes non-ASCII letters', () => {
  assert.equal(titlecase('élAN VITAL'), 'Élan Vital');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalizes words and lowercases their remaining characters', () => {
  assert.equal(titlecase('hELLO wORLD'), 'Hello World');
});

test('preserves whitespace between and around words', () => {
  assert.equal(titlecase('  one\tTWO\nthree '), '  One\tTwo\nThree ');
});

test('handles empty input and single-character words', () => {
  assert.equal(titlecase(''), '');
  assert.equal(titlecase('a b'), 'A B');
});

test('handles non-ASCII letters', () => {
  assert.equal(titlecase('éCOLE ÜBER'), 'École Über');
});

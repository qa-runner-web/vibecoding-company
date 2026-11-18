import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalises every word of a plain sentence', () => {
  assert.equal(titlecase('hello world'), 'Hello World');
});

test('keeps small words lowercase except at the start', () => {
  assert.equal(titlecase('the lord of the rings'), 'The Lord of the Rings');
  assert.equal(titlecase('a tale of two cities'), 'A Tale of Two Cities');
});

test('normalises mixed case and preserves spacing', () => {
  assert.equal(titlecase('  hELLO   wORLD  '), '  Hello   World  ');
});

test('rejects non-strings', () => {
  assert.throws(() => titlecase(42), TypeError);
});

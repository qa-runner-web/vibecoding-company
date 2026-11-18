import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalizes each word', () => {
  assert.equal(titlecase('hello big world'), 'Hello Big World');
});

test('keeps small words lowercase except at the start', () => {
  assert.equal(titlecase('the lord of the rings'), 'The Lord of the Rings');
});

test('normalizes mixed case input', () => {
  assert.equal(titlecase('tHE qUICK fox'), 'The Quick Fox');
});

test('collapses surrounding and repeated whitespace', () => {
  assert.equal(titlecase('  a   tale  '), 'A Tale');
});

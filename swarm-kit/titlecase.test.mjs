import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';

test('capitalises each word', () => {
  assert.equal(titlecase('hello world'), 'Hello World');
});

test('keeps small words lowercase except as the first word', () => {
  assert.equal(titlecase('the lord of the rings'), 'The Lord of the Rings');
  assert.equal(titlecase('a tale of two cities'), 'A Tale of Two Cities');
});

test('normalises existing capitals and extra spaces', () => {
  assert.equal(titlecase('  hELLO   wORLD '), 'Hello World');
});

test('empty string stays empty', () => {
  assert.equal(titlecase(''), '');
});

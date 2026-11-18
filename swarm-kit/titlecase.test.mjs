import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titleCase } from './titlecase.mjs';

test('titleCase capitalizes each word', () => {
  assert.equal(titleCase('hello world'), 'Hello World');
});

test('titleCase keeps small words lowercase except at the start', () => {
  assert.equal(titleCase('the lord of the rings'), 'The Lord of the Rings');
});

test('titleCase lowercases words that were all caps', () => {
  assert.equal(titleCase('NASA RULES'), 'Nasa Rules');
});

test('titleCase rejects non-strings', () => {
  assert.throws(() => titleCase(42), TypeError);
});

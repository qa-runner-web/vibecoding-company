import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';
test('basic', () => assert.equal(slugify('Hello World'), 'hello-world'));
test('punctuation and trimming', () => assert.equal(slugify('  Hi, there!! '), 'hi-there'));
test('accents', () => assert.equal(slugify('Café Déjà Vu'), 'cafe-deja-vu'));
test('empty', () => assert.equal(slugify('***'), ''));

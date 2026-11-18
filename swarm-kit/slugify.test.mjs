import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slugify.mjs';
test('basic', () => assert.equal(slugify('Hello World'), 'hello-world'));
test('punctuation trimmed', () => assert.equal(slugify('  --Hi, there!--  '), 'hi-there'));
test('accents', () => assert.equal(slugify('Café Olé'), 'cafe-ole'));
test('empty', () => assert.equal(slugify('!!!'), ''));

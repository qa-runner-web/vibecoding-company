import test from 'node:test';
import assert from 'node:assert/strict';
import { titlecase } from './titlecase.mjs';
test('basic', () => assert.equal(titlecase('hello world'), 'Hello World'));
test('mixed case', () => assert.equal(titlecase('hELLO wORLD'), 'Hello World'));
test('apostrophe', () => assert.equal(titlecase("don't stop"), "Don't Stop"));
test('hyphen', () => assert.equal(titlecase('well-known fact'), 'Well-Known Fact'));
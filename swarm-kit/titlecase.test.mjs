import test from 'node:test';import assert from 'node:assert/strict';import { titlecase } from './titlecase.mjs';
test('basic', () => assert.equal(titlecase('hello world'), 'Hello World'));
test('lowercases rest', () => assert.equal(titlecase('hELLO wORLD'), 'Hello World'));
test('hyphen', () => assert.equal(titlecase('a-b c'), 'A-B C'));
test('empty', () => assert.equal(titlecase(''), ''));

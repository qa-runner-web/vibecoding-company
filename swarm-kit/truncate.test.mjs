import test from 'node:test';import assert from 'node:assert/strict';import { truncate } from './truncate.mjs';
test('short unchanged', () => assert.equal(truncate('abc', 5), 'abc'));
test('truncates', () => assert.equal(truncate('abcdefgh', 5), 'abcd…'));
test('custom ellipsis', () => assert.equal(truncate('abcdefgh', 6, '...'), 'abc...'));
test('tiny max', () => assert.equal(truncate('abcdef', 1), '…'));

import test from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from './truncate.mjs';
test('short string unchanged', () => assert.equal(truncate('hi', 5), 'hi'));
test('long string shortened with ellipsis', () => assert.equal(truncate('hello world', 6), 'hello…'));
test('custom ellipsis', () => assert.equal(truncate('hello world', 8, '...'), 'hello...'));
test('tiny n', () => assert.equal(truncate('hello', 0), ''));

import test from 'node:test';import assert from 'node:assert/strict';import { unique } from './unique.mjs';
test('primitives', () => assert.deepEqual(unique([1,2,1,3,2]), [1,2,3]));
test('empty', () => assert.deepEqual(unique([]), []));
test('keyFn', () => assert.deepEqual(unique([{a:1},{a:1},{a:2}], x => x.a), [{a:1},{a:2}]));
test('keeps order', () => assert.deepEqual(unique(['b','a','b']), ['b','a']));

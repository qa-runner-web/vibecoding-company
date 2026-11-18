import test from 'node:test';import assert from 'node:assert/strict';import { zip } from './zip.mjs';
test('basic', () => assert.deepEqual(zip([1,2],['a','b']), [[1,'a'],[2,'b']]));
test('shortest', () => assert.deepEqual(zip([1,2,3],['a']), [[1,'a']]));
test('three', () => assert.deepEqual(zip([1],[2],[3]), [[1,2,3]]));
test('none', () => assert.deepEqual(zip(), []));

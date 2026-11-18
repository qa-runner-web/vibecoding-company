import test from 'node:test';import assert from 'node:assert/strict';import { range } from './range.mjs';
test('single arg', () => assert.deepEqual(range(3), [0,1,2]));
test('start end', () => assert.deepEqual(range(2,5), [2,3,4]));
test('step', () => assert.deepEqual(range(0,10,5), [0,5]));
test('descending', () => assert.deepEqual(range(3,0), [3,2,1]));
test('zero step', () => assert.throws(() => range(0,3,0), RangeError));

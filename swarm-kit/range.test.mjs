import test from 'node:test';
import assert from 'node:assert/strict';
import { range } from './range.mjs';
test('inclusive ascending', () => assert.deepEqual(range(1, 4), [1, 2, 3, 4]));
test('with step', () => assert.deepEqual(range(0, 10, 5), [0, 5, 10]));
test('descending', () => assert.deepEqual(range(3, 1, -1), [3, 2, 1]));
test('zero step throws', () => assert.throws(() => range(1, 2, 0), RangeError));

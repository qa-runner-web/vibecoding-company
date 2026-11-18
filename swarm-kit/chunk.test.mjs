import test from 'node:test';
import assert from 'node:assert/strict';
import { chunk } from './chunk.mjs';
test('splits evenly', () => assert.deepEqual(chunk([1,2,3,4], 2), [[1,2],[3,4]]));
test('keeps remainder', () => assert.deepEqual(chunk([1,2,3], 2), [[1,2],[3]]));
test('empty input', () => assert.deepEqual(chunk([], 3), []));
test('invalid size throws', () => assert.throws(() => chunk([1], 0), RangeError));

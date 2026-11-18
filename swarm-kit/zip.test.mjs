import test from 'node:test';
import assert from 'node:assert/strict';
import { zip } from './zip.mjs';
test('pairs equal arrays', () => assert.deepEqual(zip([1, 2], ['a', 'b']), [[1, 'a'], [2, 'b']]));
test('truncates to shorter', () => assert.deepEqual(zip([1, 2, 3], ['a']), [[1, 'a']]));
test('empty', () => assert.deepEqual(zip([], [1]), []));

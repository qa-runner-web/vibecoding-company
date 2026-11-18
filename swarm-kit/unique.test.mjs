import test from 'node:test';
import assert from 'node:assert/strict';
import { unique } from './unique.mjs';
test('removes duplicates keeping order', () => assert.deepEqual(unique([3, 1, 3, 2, 1]), [3, 1, 2]));
test('empty', () => assert.deepEqual(unique([]), []));
test('strings', () => assert.deepEqual(unique(['a', 'a', 'b']), ['a', 'b']));

import test from 'node:test';import assert from 'node:assert/strict';
import {median} from './median.mjs';
test('odd',()=>assert.equal(median([3,1,2]),2));
test('even',()=>assert.equal(median([4,1,3,2]),2.5));
test('does not mutate',()=>{const a=[3,1,2];median(a);assert.deepEqual(a,[3,1,2])});
test('empty throws',()=>assert.throws(()=>median([]),RangeError));

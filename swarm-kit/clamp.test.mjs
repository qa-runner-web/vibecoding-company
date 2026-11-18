import test from 'node:test';import assert from 'node:assert/strict';
import {clamp} from './clamp.mjs';
test('inside',()=>assert.equal(clamp(5,0,10),5));
test('below/above',()=>{assert.equal(clamp(-1,0,10),0);assert.equal(clamp(11,0,10),10)});
test('bad range',()=>assert.throws(()=>clamp(1,5,0),RangeError));

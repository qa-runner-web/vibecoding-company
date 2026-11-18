import test from 'node:test';import assert from 'node:assert/strict';
import {clamp} from './clamp.mjs';
test('inside',()=>assert.equal(clamp(5,0,10),5));
test('below',()=>assert.equal(clamp(-5,0,10),0));
test('above',()=>assert.equal(clamp(50,0,10),10));
test('bad range',()=>assert.throws(()=>clamp(1,5,0)));
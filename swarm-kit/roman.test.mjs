import test from 'node:test';import assert from 'node:assert/strict';
import {roman} from './roman.mjs';
test('basic',()=>{assert.equal(roman(1),'I');assert.equal(roman(4),'IV');assert.equal(roman(9),'IX')});
test('big',()=>{assert.equal(roman(1994),'MCMXCIV');assert.equal(roman(3999),'MMMCMXCIX')});
test('invalid',()=>{assert.throws(()=>roman(0),RangeError);assert.throws(()=>roman(4000),RangeError);assert.throws(()=>roman(1.5),RangeError)});

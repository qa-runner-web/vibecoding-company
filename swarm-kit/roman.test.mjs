import test from 'node:test';import assert from 'node:assert/strict';
import {toRoman,fromRoman} from './roman.mjs';
test('toRoman basics',()=>{assert.equal(toRoman(4),'IV');assert.equal(toRoman(1994),'MCMXCIV');assert.equal(toRoman(3999),'MMMCMXCIX');});
test('fromRoman basics',()=>{assert.equal(fromRoman('XLII'),42);assert.equal(fromRoman('MCMXCIV'),1994);});
test('roundtrip',()=>{for(let i=1;i<=3999;i++)assert.equal(fromRoman(toRoman(i)),i);});
test('invalid',()=>{assert.throws(()=>toRoman(0));assert.throws(()=>fromRoman('IIII'));assert.throws(()=>fromRoman('abc'));});

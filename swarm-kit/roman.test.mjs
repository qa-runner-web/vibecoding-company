import test from 'node:test';
import assert from 'node:assert/strict';
import { toRoman, fromRoman } from './roman.mjs';
test('toRoman', () => { assert.equal(toRoman(4), 'IV'); assert.equal(toRoman(1994), 'MCMXCIV'); });
test('fromRoman', () => { assert.equal(fromRoman('XLII'), 42); assert.equal(fromRoman('MCMXCIV'), 1994); });
test('round trip', () => { for (let i = 1; i <= 3999; i++) assert.equal(fromRoman(toRoman(i)), i); });
test('invalid', () => { assert.throws(() => toRoman(0), RangeError); assert.throws(() => fromRoman('IIII'), SyntaxError); });

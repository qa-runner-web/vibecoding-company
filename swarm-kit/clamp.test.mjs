import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('leaves values inside the range unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
});

test('clamps values outside either bound', () => {
  assert.equal(clamp(-4, 0, 10), 0);
  assert.equal(clamp(12, 0, 10), 10);
});

test('handles equal and infinite bounds', () => {
  assert.equal(clamp(2, 3, 3), 3);
  assert.equal(clamp(Infinity, -Infinity, 5), 5);
});

test('rejects reversed bounds and non-numbers', () => {
  assert.throws(() => clamp(1, 2, 0), RangeError);
  assert.throws(() => clamp(NaN, 0, 1), TypeError);
  assert.throws(() => clamp('1', 0, 1), TypeError);
});

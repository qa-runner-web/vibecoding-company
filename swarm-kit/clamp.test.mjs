import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('leaves values within the interval unchanged', () => {
  assert.equal(clamp(3, 1, 5), 3);
  assert.equal(clamp(1, 1, 5), 1);
  assert.equal(clamp(5, 1, 5), 5);
});

test('limits values outside the interval', () => {
  assert.equal(clamp(-2, 1, 5), 1);
  assert.equal(clamp(8, 1, 5), 5);
});

test('supports a single-point interval', () => {
  assert.equal(clamp(10, 4, 4), 4);
});

test('rejects reversed bounds', () => {
  assert.throws(() => clamp(3, 5, 1), RangeError);
});

test('propagates NaN', () => {
  assert.ok(Number.isNaN(clamp(NaN, 0, 1)));
});

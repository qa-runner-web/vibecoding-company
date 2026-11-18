import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('clamp returns the value when it is inside the range', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('clamp limits values below and above the range', () => {
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('clamp keeps values equal to the bounds', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('clamp rejects min greater than max', () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});

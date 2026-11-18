import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('returns the value when inside the range', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('clamps below min and above max', () => {
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('accepts boundary values unchanged', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('throws when min is greater than max', () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});

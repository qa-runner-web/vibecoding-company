import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('returns x when inside the range', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('clamps below and above the range', () => {
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('boundaries are returned unchanged', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('rejects an inverted range', () => {
  assert.throws(() => clamp(1, 10, 0), RangeError);
});

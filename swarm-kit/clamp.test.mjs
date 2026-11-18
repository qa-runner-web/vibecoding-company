import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clamp } from './clamp.mjs';

test('values inside the range are unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('values below and above the range snap to the bounds', () => {
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});

test('negative ranges and degenerate ranges work', () => {
  assert.equal(clamp(-20, -5, -1), -5);
  assert.equal(clamp(7, 3, 3), 3);
});

test('min greater than max is rejected', () => {
  assert.throws(() => clamp(1, 5, 2), RangeError);
});

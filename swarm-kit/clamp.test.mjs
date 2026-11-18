import { test } from 'node:test';
import assert from 'node:assert/strict';
import clamp, { clamp as namedClamp } from './clamp.mjs';

test('leaves values inside the range unchanged', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('clamps values below and above the range', () => {
  assert.equal(clamp(-4, 0, 10), 0);
  assert.equal(clamp(12, 0, 10), 10);
});

test('supports equal and negative bounds', () => {
  assert.equal(namedClamp(1, -3, -1), -1);
  assert.equal(clamp(100, 2, 2), 2);
});

test('rejects reversed bounds', () => {
  assert.throws(() => clamp(5, 10, 0), RangeError);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { range } from "./range.mjs";

test("counts up from a to b exclusive", () => {
  assert.deepEqual(range(0, 5), [0, 1, 2, 3, 4]);
});

test("honours an explicit step", () => {
  assert.deepEqual(range(0, 10, 3), [0, 3, 6, 9]);
});

test("counts down when a is above b", () => {
  assert.deepEqual(range(3, 0), [3, 2, 1]);
  assert.deepEqual(range(10, 0, -4), [10, 6, 2]);
});

test("returns empty when a equals b", () => {
  assert.deepEqual(range(2, 2), []);
});

test("rejects step 0 and steps that move away from b", () => {
  assert.throws(() => range(0, 5, 0), RangeError);
  assert.throws(() => range(0, 5, -1), RangeError);
});

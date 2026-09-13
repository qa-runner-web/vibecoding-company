import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePackageMetadata } from '../scripts/package-metadata.js';

test('accepts package metadata with a name and scripts object', () => {
  assert.equal(validatePackageMetadata({ name: 'example', scripts: {} }), null);
});

test('rejects package metadata without a name or scripts object', () => {
  assert.equal(
    validatePackageMetadata({ scripts: {} }),
    'package.json must have a nonempty name',
  );
  assert.equal(
    validatePackageMetadata({ name: 'example' }),
    'package.json must have a scripts object',
  );
});

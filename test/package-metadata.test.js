import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);
const checker = path.resolve('scripts/check-package-metadata.js');

async function runChecker(packageJson) {
  const directory = await mkdtemp(path.join(process.cwd(), '.package-metadata-'));
  const packagePath = path.join(directory, 'package.json');
  await writeFile(packagePath, JSON.stringify(packageJson));

  try {
    return await execFileAsync(process.execPath, [checker, packagePath]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('accepts a nonempty name and scripts object', async () => {
  const { stdout } = await runChecker({ name: 'example', scripts: {} });
  assert.equal(stdout.trim(), 'PACKAGE_METADATA_OK');
});

test('rejects an empty name', async () => {
  await assert.rejects(
    runChecker({ name: '   ', scripts: {} }),
    (error) => error.code === 1 && error.stderr.includes('name must be nonempty'),
  );
});

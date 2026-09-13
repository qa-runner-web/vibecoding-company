import { readFile } from 'node:fs/promises';
import path from 'node:path';

const packagePath = process.argv[2] ?? path.resolve('package.json');

try {
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));

  if (typeof packageJson.name !== 'string' || packageJson.name.trim() === '') {
    throw new Error('package.json name must be nonempty');
  }

  if (packageJson.scripts === null || typeof packageJson.scripts !== 'object' || Array.isArray(packageJson.scripts)) {
    throw new Error('package.json scripts must be an object');
  }

  console.log('PACKAGE_METADATA_OK');
} catch (error) {
  console.error(`PACKAGE_METADATA_ERROR: ${error.message}`);
  process.exitCode = 1;
}

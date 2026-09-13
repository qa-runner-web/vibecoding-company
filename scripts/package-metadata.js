import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export function validatePackageMetadata(packageJson) {
  if (!packageJson || typeof packageJson.name !== 'string' || !packageJson.name.trim()) {
    return 'package.json must have a nonempty name';
  }

  if (!packageJson.scripts || typeof packageJson.scripts !== 'object' || Array.isArray(packageJson.scripts)) {
    return 'package.json must have a scripts object';
  }

  return null;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
    const error = validatePackageMetadata(packageJson);

    if (error) {
      console.error(`PACKAGE_METADATA_ERROR: ${error}`);
      process.exitCode = 1;
    } else {
      console.log('PACKAGE_METADATA_OK');
    }
  } catch (error) {
    console.error(`PACKAGE_METADATA_ERROR: ${error.message}`);
    process.exitCode = 1;
  }
}

export const PLUGIN_DISCOVERY_ERROR_CODE = 'PLUGIN_DISCOVERY_FAILED' as const;

export const PLUGIN_DISCOVERY_NEXT_ACTION =
  'Retry plugin discovery. If it continues, verify connector availability and configuration without sharing credentials.';

export class PluginDiscoveryError extends Error {
  readonly code = PLUGIN_DISCOVERY_ERROR_CODE;
  readonly nextAction = PLUGIN_DISCOVERY_NEXT_ACTION;

  constructor() {
    super('Plugin discovery failed. No connector credentials were exposed.');
    this.name = 'PluginDiscoveryError';
  }
}

export type PluginDiscoveryResult<T> =
  | { ok: true; plugins: T[] }
  | { ok: false; error: PluginDiscoveryError };

/**
 * Runs plugin discovery without allowing connector errors or credentials to
 * escape to callers. The loader's error is intentionally not retained.
 */
export async function discoverPlugins<T>(
  loader: () => Promise<T[]>,
): Promise<PluginDiscoveryResult<T>> {
  try {
    return { ok: true, plugins: await loader() };
  } catch {
    return { ok: false, error: new PluginDiscoveryError() };
  }
}

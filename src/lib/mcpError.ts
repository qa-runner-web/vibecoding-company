export interface McpErrorSummary {
  code?: string | number;
  message?: string;
  retryable?: boolean;
}

type ErrorRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ErrorRecord {
  return typeof value === 'object' && value !== null;
}

/**
 * Extract the safe, interoperable portion of an MCP error.
 *
 * MCP/JSON-RPC errors may be returned either directly or under an `error`
 * property. Unknown fields are deliberately ignored so this summary never
 * exposes server data, request parameters, or stack traces.
 */
export function summarizeMcpError(error: unknown): McpErrorSummary {
  const source = isRecord(error) && isRecord(error.error) ? error.error : error;
  const summary: McpErrorSummary = {};

  if (!isRecord(source)) {
    if (error instanceof Error && error.message) {
      summary.message = error.message;
    }
    return summary;
  }

  const { code, message, retryable } = source;

  if (typeof code === 'string' || (typeof code === 'number' && Number.isFinite(code))) {
    summary.code = code;
  }

  if (typeof message === 'string' && message.length > 0) {
    summary.message = message;
  }

  if (typeof retryable === 'boolean') {
    summary.retryable = retryable;
  }

  return summary;
}

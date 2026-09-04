/**
 * The safe, user-facing portion of an MCP error.
 * Optional properties are omitted when the source error does not provide them.
 */
export interface McpErrorSummary {
  code?: string | number;
  message?: string;
  retryable?: boolean;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function firstErrorRecord(error: unknown): UnknownRecord | undefined {
  if (!isRecord(error)) return undefined;

  const candidates = [
    error.error,
    isRecord(error.data) ? error.data.error : undefined,
    isRecord(error.body) ? error.body.error : undefined,
    error.cause,
    error,
  ];

  return candidates.find((candidate) => {
    if (!isRecord(candidate)) return false;
    return 'code' in candidate || 'message' in candidate || 'retryable' in candidate || 'data' in candidate;
  }) as UnknownRecord | undefined;
}

/**
 * Extract only the standard MCP error fields from an unknown thrown value.
 * This deliberately does not return `data`, stack traces, request details,
 * or the original error, which may contain credentials or personal data.
 */
export function summarizeMcpError(error: unknown): McpErrorSummary {
  const source = firstErrorRecord(error);
  if (!source) {
    return typeof error === 'string' ? { message: error } : {};
  }

  const summary: McpErrorSummary = {};
  const code = source.code;
  const message = source.message ?? (error instanceof Error ? error.message : undefined);
  const nestedData = isRecord(source.data) ? source.data : undefined;
  const retryable = source.retryable ?? nestedData?.retryable;

  if (typeof code === 'string' || (typeof code === 'number' && Number.isFinite(code))) {
    summary.code = code;
  }
  if (typeof message === 'string') {
    summary.message = message;
  }
  if (typeof retryable === 'boolean') {
    summary.retryable = retryable;
  }

  return summary;
}

export interface ProjectSummary {
  id: string;
  title: string;
}

type McpResponse = {
  result?: {
    structuredContent?: unknown;
    content?: unknown;
  };
};

function asProjectList(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of ['projects', 'items', 'data']) {
      if (Array.isArray(record[key])) return record[key];
    }
  }

  return [];
}

function parseTextContent(content: unknown): unknown {
  if (!Array.isArray(content)) return undefined;

  const text = content.find(
    (item): item is { type: 'text'; text: string } =>
      !!item &&
      typeof item === 'object' &&
      (item as Record<string, unknown>).type === 'text' &&
      typeof (item as Record<string, unknown>).text === 'string',
  );

  if (!text) return undefined;

  try {
    return JSON.parse(text.text);
  } catch {
    return undefined;
  }
}

/**
 * Projects one MCP tool response into safe, display-ready project summaries.
 * Only the explicitly selected fields are copied, so credentials and other
 * response fields cannot leak into the returned objects.
 */
export function projectMcpResponse(response: McpResponse): ProjectSummary[] {
  const result = response?.result;
  const payload = result?.structuredContent ?? parseTextContent(result?.content);

  return asProjectList(payload).flatMap((project) => {
    if (!project || typeof project !== 'object') return [];

    const { id, title } = project as Record<string, unknown>;
    if (typeof id !== 'string' || typeof title !== 'string') return [];

    return [{ id, title }];
  });
}

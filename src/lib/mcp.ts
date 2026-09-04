export interface ProjectedMcpItem {
  id: string;
  title: string;
}

type UnknownRecord = Record<string, unknown>;

/**
 * Projects an MCP response into the safe, minimal shape used by the client.
 *
 * MCP servers commonly return either an array directly or an envelope whose
 * content contains JSON text. Only id and title are copied, so credentials and
 * any other fields cannot leak into the projected result.
 */
export function projectMcpResponse(response: unknown): ProjectedMcpItem[] {
  const items = extractItems(response);

  return items.flatMap((item) => {
    if (!isRecord(item) || item.id == null || item.title == null) {
      return [];
    }

    return [{
      id: String(item.id),
      title: String(item.title),
    }];
  });
}

function extractItems(response: unknown): unknown[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return [];
  }

  const result = response.result;
  if (Array.isArray(result)) {
    return result;
  }

  if (isRecord(result)) {
    return extractItems(result);
  }

  const content = response.content;
  if (Array.isArray(content)) {
    return content.flatMap(parseContentItem);
  }

  return [];
}

function parseContentItem(item: unknown): unknown[] {
  if (!isRecord(item)) {
    return [];
  }

  if (typeof item.text === 'string') {
    try {
      const parsed = JSON.parse(item.text) as unknown;
      return extractItems(parsed);
    } catch {
      return [];
    }
  }

  return [item];
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

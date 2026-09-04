/**
 * The client-facing shape for a bounded structured MCP result.
 *
 * `returnedCount` intentionally describes only the items included in this
 * response. It must not be presented as the provider's total item count.
 */
export interface StructuredMcpResult<T> {
  items: T[];
  returnedCount: number;
}

const MAX_RETURNED_ITEMS = 3;

/**
 * Bound an MCP result for display without claiming an authoritative total.
 */
export function limitMcpResult<T>(items: readonly T[]): StructuredMcpResult<T> {
  const returnedItems = items.slice(0, MAX_RETURNED_ITEMS);

  return {
    items: returnedItems,
    returnedCount: returnedItems.length,
  };
}

/**
 * Metadata returned by a bounded read-only query.
 *
 * The helper below intentionally does not follow a cursor or issue another
 * request. Callers can show the notice and decide whether to request the next
 * page explicitly.
 */
export interface BoundedQueryResult<T> {
  data: T;
  isPartial?: boolean;
  hasMore?: boolean;
  nextCursor?: string | null;
  nextPageToken?: string | null;
}

export interface BoundedQueryReport {
  isPartial: boolean;
  hasNextPage: boolean;
  message: string | null;
  nextStep: string | null;
}

/**
 * Summarize bounded-query metadata for a user-facing response.
 *
 * This is deliberately a pure function: a pagination marker is reported, not
 * consumed. The caller must make a separate, explicit read-only query if the
 * user asks to continue.
 */
export function reportBoundedQuery<T>(result: BoundedQueryResult<T>): BoundedQueryReport {
  const hasNextPage = Boolean(
    result.hasMore || result.nextCursor || result.nextPageToken
  );
  const isPartial = Boolean(result.isPartial || hasNextPage);

  if (!isPartial) {
    return {
      isPartial: false,
      hasNextPage: false,
      message: null,
      nextStep: null,
    };
  }

  return {
    isPartial: true,
    hasNextPage,
    message: 'This bounded query returned a partial result.',
    nextStep: hasNextPage
      ? 'The next read-only step is to request the next page explicitly with the returned continuation marker; no additional page was fetched automatically.'
      : 'The next read-only step is to run a broader bounded query explicitly; no additional data was fetched automatically.',
  };
}

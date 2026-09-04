export type FixtureCleanupResult =
  | { attempted: false }
  | { attempted: true; ok: true }
  | { attempted: true; ok: false; error: unknown };

export type DisposableFixtureOperationResult<TResult> =
  | {
      ok: true;
      result: TResult;
      cleanup: FixtureCleanupResult;
    }
  | {
      ok: false;
      operationError: unknown;
      cleanup: FixtureCleanupResult;
    };

/**
 * Runs an operation against a disposable fixture and cleans up anything that
 * was created before the operation failed. Cleanup errors are returned rather
 * than replacing the original operation error.
 */
export async function runDisposableFixtureOperation<TFixture, TResult>(
  createFixture: () => Promise<TFixture>,
  operation: (fixture: TFixture) => Promise<TResult>,
  cleanupFixture: (fixture: TFixture) => Promise<void>,
): Promise<DisposableFixtureOperationResult<TResult>> {
  let fixture: TFixture;

  try {
    fixture = await createFixture();
  } catch (operationError) {
    return {
      ok: false,
      operationError,
      cleanup: { attempted: false },
    };
  }

  try {
    const result = await operation(fixture);
    return {
      ok: true,
      result,
      cleanup: { attempted: false },
    };
  } catch (operationError) {
    try {
      await cleanupFixture(fixture);
      return {
        ok: false,
        operationError,
        cleanup: { attempted: true, ok: true },
      };
    } catch (error) {
      return {
        ok: false,
        operationError,
        cleanup: { attempted: true, ok: false, error },
      };
    }
  }
}

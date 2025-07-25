export function runOnce<T, P extends any[]>(fn: (...args: P) => T): (...args: P) => T {
  let result: T | undefined;
  let hasRun = false;

  return (...args: P) => {
    if (!hasRun) {
      hasRun = true;
      result = fn(...args);
    }

    return result as T;
  };
}

export function runSingleInstance<T, P extends any[]>(
  fn: (...args: P) => Promise<T>
): (...args: P) => Promise<T> {
  let isRunning = false;
  let pendingPromise: Promise<T> | null = null;

  return async (...args: P): Promise<T> => {
    if (isRunning && pendingPromise) {
      return pendingPromise;
    }

    isRunning = true;
    pendingPromise = fn(...args).finally(() => {
      isRunning = false;
      pendingPromise = null;
    });

    return pendingPromise;
  };
}

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

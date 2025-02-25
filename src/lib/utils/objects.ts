export function objectToQueryString(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function isClientSide() {
  return typeof window !== "undefined";
}

export function isApp() {
  return isClientSide() && navigator.userAgent === "Fenjoon-WebView";
}

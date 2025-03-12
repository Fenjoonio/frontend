import { isClientSide } from "./environment";

export function postMessage(type: string, data: Record<string, any>) {
  if (!isClientSide()) {
    console.warn("React native postMessage is not working on the server side");
    return;
  }

  return window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
}

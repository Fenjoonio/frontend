import { isClientSide } from "./environment";

type PostMessageType = "share";
type ShareData = { title?: string; message?: string; url?: string };

export function postMessage(type: "share", data: ShareData): void;
export function postMessage(type: PostMessageType, data: ShareData) {
  if (!isClientSide()) {
    console.warn("React native postMessage is not working on the server side");
    return;
  }

  return window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
}

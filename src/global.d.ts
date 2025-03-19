interface Window {
  expoPushToken: string;
  ReactNativeWebView: {
    postMessage(msg: string): void;
  };
}

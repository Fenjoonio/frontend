interface Window {
  expoPushToken: string;
  ReactNativeWebView: {
    postMessage(msg: string): void;
  };
}

interface Paginated<T> {
  items: T[];
  pagination: { limit: number; page: number; pages: number; total: number };
}

export default class HttpClient {
  private baseURL: string;
  private requestInterceptors: Array<
    (config: RequestInit) => Promise<RequestInit | void>
  >;
  private responseInterceptors: Array<(data: unknown) => Promise<unknown>>;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  useRequestInterceptor(
    interceptor: (config: RequestInit) => Promise<RequestInit | void>
  ): void {
    this.requestInterceptors.push(interceptor);
  }

  useResponseInterceptor(
    interceptor: (data: unknown) => Promise<unknown>
  ): void {
    this.responseInterceptors.push(interceptor);
  }

  async request<T = unknown>(
    method: string,
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    let config: RequestInit = { method, headers: {}, ...options };

    for (const interceptor of this.requestInterceptors) {
      config = (await interceptor(config)) || config;
    }

    const response = await fetch(`${this.baseURL}${url}`, config);
    let data = await response.json();

    for (const interceptor of this.responseInterceptors) {
      data = (await interceptor(data)) || data;
    }

    return data;
  }

  get<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, options);
  }

  post<T = unknown>(
    url: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>("POST", url, {
      ...options,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  put<T = unknown>(
    url: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>("PUT", url, {
      ...options,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  delete<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, options);
  }
}

//   // Example usage:
//   const apiClient = new HttpClient('https://api.example.com');

//   // Add a request interceptor
//   apiClient.useRequestInterceptor(async (config) => {
//     (config.headers as Record<string, string>)['Authorization'] = 'Bearer token';
//     return config;
//   });

//   // Add a response interceptor
//   apiClient.useResponseInterceptor(async (data) => {
//     console.log('Response received:', data);
//     return data;
//   });

//   // Making a request
//   apiClient.get('/users').then(console.log).catch(console.error);

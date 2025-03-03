type APIResponse<T = unknown> = {
  status: number;
  message: string;
  data: T;
};

type RequestOptions = RequestInit & { params?: Record<string, any>; throwError?: boolean };

export default class HttpClient {
  private baseURL: string;
  private requestInterceptors: Array<(config: RequestInit) => Promise<RequestInit | void>>;
  private responseInterceptors: Array<
    (data: APIResponse, config: RequestOptions) => Promise<APIResponse>
  >;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  useRequestInterceptor(interceptor: (config: RequestInit) => Promise<RequestInit | void>) {
    this.requestInterceptors.push(interceptor);
  }

  useResponseInterceptor(
    interceptor: (data: APIResponse, config: RequestOptions) => Promise<APIResponse>
  ) {
    this.responseInterceptors.push(interceptor);
  }

  private buildQueryParams(params?: Record<string, any>): string {
    if (!params) return "";
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    return query.toString() ? `?${query.toString()}` : "";
  }

  async request<T = unknown>(
    method: string,
    url: string,
    options: RequestOptions = {}
  ): Promise<APIResponse<T>> {
    let config: RequestInit = { method, headers: {}, ...options };
    const queryString = this.buildQueryParams(options.params);

    for (const interceptor of this.requestInterceptors) {
      config = (await interceptor(config)) || config;
    }

    try {
      const response = await fetch(`${this.baseURL}${url}${queryString}`, config);
      const data = await response.json();

      let result = {
        message: data.message || "مشکلی پیش آمده است",
        data: data.data || {},
        status: response.status,
      };

      for (const interceptor of this.responseInterceptors) {
        result = { ...result, ...((await interceptor(result, options)) || {}) };
      }

      return result;
    } catch (error) {
      console.error(error);

      if (options.throwError) {
        throw error;
      }

      return { status: 500, data: <T>{}, message: "مشکلی پیش آمده است" };
    }
  }

  get<T = unknown>(
    url: string,
    options?: RequestInit & { params?: Record<string, any>; throwError?: boolean }
  ): Promise<APIResponse<T>> {
    return this.request<T>("GET", url, options);
  }

  post<T = unknown>(
    url: string,
    body: unknown,
    options: RequestInit & { params?: Record<string, any>; throwError?: boolean } = {}
  ): Promise<APIResponse<T>> {
    return this.request<T>("POST", url, {
      ...options,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  put<T = unknown>(
    url: string,
    body: unknown,
    options: RequestInit & { params?: Record<string, any>; throwError?: boolean } = {}
  ): Promise<APIResponse<T>> {
    return this.request<T>("PUT", url, {
      ...options,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  patch<T = unknown>(
    url: string,
    body: unknown,
    options: RequestInit & { params?: Record<string, any>; throwError?: boolean } = {}
  ): Promise<APIResponse<T>> {
    return this.request<T>("PATCH", url, {
      ...options,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  delete<T = unknown>(
    url: string,
    options?: RequestInit & { params?: Record<string, any>; throwError?: boolean }
  ): Promise<APIResponse<T>> {
    return this.request<T>("DELETE", url, options);
  }
}

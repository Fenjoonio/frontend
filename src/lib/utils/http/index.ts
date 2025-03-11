import hooks from "./hooks";
import ky, { Input, Options } from "ky";
import type { ApiResponse } from "./types";
import { ApiError } from "@/lib/exceptions";

const request = ky.create({ hooks, retry: 0, prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL });

const handleRequest = async <T = unknown>(
  method: "get" | "post" | "patch" | "put" | "delete",
  input: Input,
  options?: Options,
  json?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const requestOptions = json ? { json, ...options } : options;
    const response = await request<ApiResponse<T>>(input, { method, ...requestOptions });
    const data = await response.json();

    return data;
  } catch (error) {
    const err = error as ApiError;

    // We need this to make sure react-query works.
    if (options?.throwHttpErrors !== false) {
      throw error;
    }

    return { data: null as T, status: err.status || 500, message: err.message };
  }
};

const http = {
  get: <T = unknown>(input: Input, options?: Options) => handleRequest<T>("get", input, options),
  post: <T = unknown>(input: Input, json?: unknown, options?: Options) =>
    handleRequest<T>("post", input, options, json),
  patch: <T = unknown>(input: Input, json?: unknown, options?: Options) =>
    handleRequest<T>("patch", input, options, json),
  put: <T = unknown>(input: Input, json?: unknown, options?: Options) =>
    handleRequest<T>("put", input, options, json),
  delete: <T = unknown>(input: Input, options?: Options) =>
    handleRequest<T>("delete", input, options),
};

export default http;

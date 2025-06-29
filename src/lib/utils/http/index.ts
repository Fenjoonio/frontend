import hooks from "./hooks";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/exceptions";
import ky, { HTTPError, type Input } from "ky";
import { isClientSide } from "@/lib/utils/environment";
import type { ApiResponse, RequestOptions } from "./types";
console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

const request = ky.create({ hooks, retry: 0, prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL });

const getErrorMessage = async (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof HTTPError) {
    try {
      const errorData = await error.response.json();
      return errorData.message || "مشکلی پیش آمده";
    } catch {
      return "مشکلی پیش آمده";
    }
  }
};

const handleRequest = async <T = unknown>(
  method: "get" | "post" | "patch" | "put" | "delete",
  input: Input,
  options?: RequestOptions,
  json?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const requestOptions = json ? { json, ...options } : options;
    const response = await request<ApiResponse<T>>(input, { method, ...requestOptions });
    const data = await response.json();

    return data;
  } catch (error) {
    const err = error as ApiError;

    if (options?.showToast !== false) {
      const errorHandler = isClientSide() ? toast.error : console.log;
      const message = await getErrorMessage(error);

      errorHandler(message);
    }

    // We need this to make sure react-query works.
    if (options?.throwHttpErrors !== false) {
      throw error;
    }

    return { data: null as T, status: err.status || 500, message: err.message };
  }
};

const http = {
  get: <T = unknown>(input: Input, options?: RequestOptions) =>
    handleRequest<T>("get", input, options),
  post: <T = unknown>(input: Input, json?: unknown, options?: RequestOptions) =>
    handleRequest<T>("post", input, options, json),
  patch: <T = unknown>(input: Input, json?: unknown, options?: RequestOptions) =>
    handleRequest<T>("patch", input, options, json),
  put: <T = unknown>(input: Input, json?: unknown, options?: RequestOptions) =>
    handleRequest<T>("put", input, options, json),
  delete: <T = unknown>(input: Input, json?: unknown, options?: RequestOptions) =>
    handleRequest<T>("delete", input, options, json),
};

export default http;

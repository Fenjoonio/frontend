import type { Options } from "ky";

export type RequestOptions = Options & { showToast?: boolean };

export type ApiResponse<T = unknown> = {
  data: T;
  status: number;
  message: string;
};

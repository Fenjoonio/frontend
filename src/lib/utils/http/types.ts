export type ApiResponse<T = unknown> = {
  data: T;
  status: number;
  message: string;
};

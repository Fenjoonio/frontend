import { getUserCredentials } from "@/app/(user)/accounts/actions";
import HttpClient from "./client";

const http = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL!);

http.useRequestInterceptor(async (config) => {
  const { accessToken } = await getUserCredentials();
  if (!accessToken) {
    return;
  }

  const headers = (config.headers as Record<string, string>) || {};
  headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

http.useResponseInterceptor(async (data, options) => {
  if (data.status > 400 && options.throwError) {
    throw new Error(data.message || "مشکلی پیش آمده است");
  }

  return data;
});

export default http;

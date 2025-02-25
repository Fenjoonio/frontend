import { toast } from "react-toastify";
import HttpClient from "./client";
import { deleteUserCredentials, getUserCredentials } from "@/app/(user)/accounts/actions";

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
  if (data.status === 401) {
    await deleteUserCredentials();

    const params = new URLSearchParams();
    params.set("redirect", window.location.pathname);

    window.location.replace(`/accounts/login?${params.toString()}`);
  }

  if (data.status >= 400) {
    toast.error(data.message || "مشکلی پیش آمده است");

    if (options.throwError) {
      throw new Error(data.message || "مشکلی پیش آمده است");
    }
  }

  return data;
});

export default http;

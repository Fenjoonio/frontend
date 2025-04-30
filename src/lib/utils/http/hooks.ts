import ky from "ky";
import { redirect } from "next/navigation";
import { isClientSide } from "../environment";
import { RefreshResponse } from "@/services/accounts";
import type { Hooks, KyRequest, KyResponse, Options } from "ky";
import { getUserCredentials } from "@/app/(user)/accounts/actions";
import { AuthError } from "@/lib/exceptions";

// Before Request
const addAuthorizationHook = async (request: KyRequest) => {
  const { accessToken } = await getUserCredentials();
  if (!accessToken) {
    return request;
  }

  request.headers.set("Authorization", `Bearer ${accessToken}`);

  return request;
};

// After Response
const refreshUserToken = async (request: KyRequest, options: Options, response: KyResponse) => {
  if (response.status !== 401 || (options.retry as { retried: boolean }).retried) {
    return response;
  }

  try {
    const { accessToken, refreshToken } = await getUserCredentials();

    const res = await ky.post<RefreshResponse>("api/auth/refresh", {
      json: { accessToken, refreshToken },
      prefixUrl: isClientSide() ? "/" : "http://localhost:3000/",
    });

    if (res.status >= 400) {
      throw new AuthError("لطفا مجددا وارد شوید");
    }

    const { tokens } = await res.json();
    options.headers = { ...options.headers, Authorization: `Bearer ${tokens.accessToken}` };
    (options.retry as { retried: boolean }).retried = true;

    return ky(request, options);
  } catch {
    const loginPageUrl = "/accounts/login";
    isClientSide() ? window.location.replace(loginPageUrl) : redirect(loginPageUrl);

    throw new AuthError("لطفا مجددا وارد شوید");
  }
};

const hooks: Hooks = {
  beforeRequest: [addAuthorizationHook],
  afterResponse: [refreshUserToken],
};

export default hooks;

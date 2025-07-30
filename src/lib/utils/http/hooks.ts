import ky from "ky";
import { redirect } from "next/navigation";
import { AuthError } from "@/lib/exceptions";
import { isClientSide } from "../environment";
import { logout, refresh } from "@/services/accounts";
import type { Hooks, KyRequest, KyResponse, Options } from "ky";
import { getUserCredentials } from "@/app/(user)/accounts/actions";

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

  const { refreshToken } = await getUserCredentials();

  try {
    const res = await refresh({ refreshToken });

    if (res.status !== "success") {
      throw new AuthError("لطفا مجددا وارد شوید");
    }

    (options.retry as { retried: boolean }).retried = true;

    return ky(request, options);
  } catch {
    await logout({ refreshToken });

    const loginPageUrl = "/accounts/login";
    isClientSide() ? window.location.replace(loginPageUrl) : redirect(loginPageUrl);

    throw new AuthError("لطفا مجددا وارد شوید");
  }
};

const hooks: Hooks = {
  beforeRequest: [addAuthorizationHook],
  afterResponse: [refreshUserToken], // BUG: Runs for every 401 request on the page
};

export default hooks;

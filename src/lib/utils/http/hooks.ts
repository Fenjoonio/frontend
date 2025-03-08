import type { Hooks, KyRequest } from "ky";
import { getUserCredentials } from "@/app/(user)/accounts/actions";

// Before Request
const addAuthorizationHook = async (request: KyRequest) => {
  const { accessToken } = await getUserCredentials();
  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  console.log("acccascaklda;kds", accessToken);

  return request;
};

// After Response
// const refreshUserToken = async (request: KyRequest, options: Options, response: KyResponse) => {
//   // BUG: infinite request loop!
//   if (response.status !== 401) {
//     return response;
//   }

//   const { accessToken, refreshToken } = await getUserCredentials();
//   if (!accessToken || !refreshToken) {
//     const loginPageUrl = "/accounts/login";
//     isClientSide() ? window.location.replace(loginPageUrl) : redirect(loginPageUrl);
//   }

//   const baseUrl = isClientSide() ? "/" : "http://localhost:3000/";
//   const res = await ky.post(`${baseUrl}api/auth/refresh`, {
//     throwHttpErrors: false,
//     json: { accessToken, refreshToken },
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   if (res.status >= 400) {
//     const loginPageUrl = "/accounts/login";
//     isClientSide() ? window.location.replace(loginPageUrl) : redirect(loginPageUrl);
//   }

//   return response;
// };

const hooks: Hooks = {
  beforeRequest: [addAuthorizationHook],
  afterResponse: [],
};

export default hooks;

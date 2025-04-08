import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NEEDS_LOGIN_PAGE = ["/profile", "/notifications"];

function handleUtmSources(request: NextRequest, response: NextResponse): NextResponse {
  if (!request.nextUrl.searchParams.has("utm_source") || request.cookies.has("utmSource")) {
    return response;
  }

  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);

  const utmSource = request.nextUrl.searchParams.get("utm_source");

  response.headers.set(
    "Set-Cookie",
    `utmSource=${utmSource}; expires=${expireDate.toUTCString()}; path=/`
  );

  return response;
}

function handleOnboarding(request: NextRequest): NextResponse | undefined {
  if (request.cookies.has("isFirstTime")) return;

  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);

  const response = NextResponse.redirect(new URL("/onboarding", request.url), {
    headers: {
      "Set-Cookie": `isFirstTime=false; expires=${expireDate.toUTCString()}; path=/`,
    },
  });

  return handleUtmSources(request, response);
}

function handleAuthentication(request: NextRequest): NextResponse | undefined {
  const isLoggedIn = request.cookies.has("accessToken");
  const isFirstRun = !request.cookies.has("isFirstTime");
  const { pathname } = request.nextUrl;

  if (
    !isLoggedIn &&
    !isFirstRun &&
    !pathname.startsWith("/accounts") &&
    NEEDS_LOGIN_PAGE.some((page) => pathname === page || pathname.startsWith(`${page}/`))
  ) {
    const params = new URLSearchParams();
    params.set("redirect", pathname);

    const response = NextResponse.redirect(
      new URL(`/accounts/login?${params.toString()}`, request.url)
    );

    return handleUtmSources(request, response);
  }

  return undefined;
}

export function middleware(request: NextRequest) {
  const authResponse = handleAuthentication(request);
  if (authResponse) return authResponse;

  const onboardingResponse = handleOnboarding(request);
  if (onboardingResponse) return onboardingResponse;

  const response = NextResponse.next();

  return handleUtmSources(request, response);
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };

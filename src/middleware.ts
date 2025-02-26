import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NEEDS_LOGIN_PAGE = ["/profile/edit"];

function handleOnboarding(request: NextRequest): NextResponse | undefined {
  if (request.cookies.has("isFirstTime")) return;

  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);

  return NextResponse.redirect(new URL("/onboarding", request.url), {
    headers: {
      "Set-Cookie": `${"isFirstTime"}=false; expires=${expireDate.toUTCString()}; path=/`,
    },
  });
}

function handleAuthentication(request: NextRequest): NextResponse | undefined {
  const isLoggedIn = request.cookies.has("accessToken");
  const isFirstRun = !request.cookies.has("isFirstTime");
  const { pathname } = request.nextUrl;

  if (
    !isLoggedIn &&
    !isFirstRun &&
    !pathname.includes("/accounts") &&
    NEEDS_LOGIN_PAGE.includes(pathname)
  ) {
    const params = new URLSearchParams();
    params.set("redirect", pathname);

    return NextResponse.redirect(new URL(`/accounts/login?${params.toString()}`, request.url));
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  return handleOnboarding(request) || handleAuthentication(request) || NextResponse.next();
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };

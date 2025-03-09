import { NextResponse } from "next/server";
import { ApiResponse } from "@/lib/utils/http/types";
import { RefreshResponse } from "@/services/accounts";
import { setUserCredentials, deleteUserCredentials } from "@/app/(user)/accounts/actions";

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await request.json();

  if (!accessToken || !refreshToken) {
    await deleteUserCredentials();

    return NextResponse.json({ success: false, message: "لطفا مجددا وارد شوید" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { data } = (await response.json()) as ApiResponse<RefreshResponse>;

    if (!data.tokens.accessToken || !data.tokens.refreshToken) {
      await deleteUserCredentials();

      return NextResponse.json({ success: false }, { status: 500 });
    }

    await setUserCredentials(data.tokens);

    return NextResponse.json({ success: true, tokens: data.tokens });
  } catch {
    await deleteUserCredentials();

    return NextResponse.json({ success: false, message: "لطفا مجددا وارد شوید" }, { status: 500 });
  }
}

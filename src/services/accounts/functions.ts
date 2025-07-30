import http from "@/lib/utils/http";
import type { VerifyOtp, OtpRequest, RefreshResponse } from "./types";

export async function otpRequest(payload: { phone: string }) {
  const response = await http.post<OtpRequest>("v1/auth/otp/send", {
    phone: payload.phone,
  });

  return response.data;
}

export async function verifyOtp(payload: { phone: string; otpCode: string }) {
  const response = await http.post<VerifyOtp>(
    "v1/auth/otp/verify",
    { phone: payload.phone, code: payload.otpCode },
    { credentials: "include" }
  );

  return response.data;
}

export async function refresh(payload: { refreshToken: string }) {
  const response = await http.post<RefreshResponse>(
    "v1/auth/refresh",
    { refreshToken: payload.refreshToken },
    { credentials: "include", retry: { retried: true } as any, hooks: undefined }
  );

  return response.data;
}

export async function logout(payload: { refreshToken: string }) {
  const response = await http.post("v1/auth/logout", {
    refreshToken: payload.refreshToken,
  });

  return response.data;
}

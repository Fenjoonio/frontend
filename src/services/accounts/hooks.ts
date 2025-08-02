import { ACCOUNTS_QUERY_KEYS } from "./constants";
import { useMutation } from "@tanstack/react-query";
import type { VerifyOtp, OtpRequest } from "./types";
import { logout, otpRequest, verifyOtp } from "./functions";

export function useOtpRequest(options?: { onSuccess: (response: OtpRequest) => void }) {
  return useMutation({
    mutationKey: [ACCOUNTS_QUERY_KEYS.OTP_REQUEST],
    mutationFn: otpRequest,
    ...options,
  });
}

export function useVerifyOtp(options?: { onSuccess: (response: VerifyOtp) => void }) {
  return useMutation({
    mutationKey: [ACCOUNTS_QUERY_KEYS.LOGIN],
    mutationFn: verifyOtp,
    ...options,
  });
}

export function useLogout(options?: { onSuccess?: () => void }) {
  return useMutation({ ...options, mutationFn: logout });
}

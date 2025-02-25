export type OtpRequest = {
  phone: string;
  status: "success" | "failed";
};

export type VerifyOtp = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

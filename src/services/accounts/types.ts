export type OtpRequest = {
  phone: string;
  status: "success" | "failed";
};

export type VerifyOtp = {
  isNewUser: boolean;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshResponse = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

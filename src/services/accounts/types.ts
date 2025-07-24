export type OtpRequest = {
  phone: string;
  status: "success";
};

export type VerifyOtp = {
  isNewUser: boolean;
};

export type RefreshResponse = {
  status: "success";
};

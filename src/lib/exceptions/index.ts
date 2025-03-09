export class AuthError extends Error {
  constructor(message = "لطفا مجددا وارد شوید") {
    super(message);
    this.name = "AuthError";
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message = "خطا سمت سرور", status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

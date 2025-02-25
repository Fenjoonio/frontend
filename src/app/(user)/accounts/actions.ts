"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

type UserCredentials = {
  accessToken: string;
  refreshToken: string;
};

export async function setUserCredentials(credentials: UserCredentials) {
  const { set } = await cookies();

  set(ACCESS_TOKEN_KEY, credentials.accessToken, {
    maxAge: 5 * 24 * 60 * 60, // 5 Days
  });

  set(REFRESH_TOKEN_KEY, credentials.refreshToken, {
    maxAge: 10 * 24 * 60 * 60, // 10 Days
  });
}

export async function getUserCredentials() {
  const { get } = await cookies();

  return {
    accessToken: get(ACCESS_TOKEN_KEY)?.value || "",
    refreshToken: get(REFRESH_TOKEN_KEY)?.value || "",
  };
}

export async function deleteUserCredentials() {
  const { set } = await cookies();

  set(ACCESS_TOKEN_KEY, "value", { maxAge: 0 });
  set(REFRESH_TOKEN_KEY, "value", { maxAge: 0 });
}

export async function isUserLoggedIn() {
  const { has } = await cookies();

  return has(ACCESS_TOKEN_KEY);
}

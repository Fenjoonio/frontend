"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function getUserCredentials() {
  const { get } = await cookies();

  return {
    accessToken: get(ACCESS_TOKEN_KEY)?.value || "",
    refreshToken: get(REFRESH_TOKEN_KEY)?.value || "",
  };
}

export async function deleteUserCredentials() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}

export async function isUserLoggedIn() {
  const { has } = await cookies();

  return has(ACCESS_TOKEN_KEY);
}

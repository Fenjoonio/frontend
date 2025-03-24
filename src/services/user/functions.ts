import http from "@/lib/utils/http";
import type { GetUserByIdParams, User } from "./types";

export async function getCurrentUser() {
  const response = await http.get<User>("v1/users/me", { throwHttpErrors: false });

  return response.data;
}

export async function updateCurrentUser(body: Pick<User, "firstName" | "lastName" | "nickname">) {
  const response = await http.patch<User>("v1/users/me", body);

  return response.data;
}

export async function getUserById(params: GetUserByIdParams) {
  const response = await http.get<User>(`v1/users/${params.id}`);

  return response.data;
}

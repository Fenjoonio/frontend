import http from "@/lib/utils/http";
import type { User } from "./types";

export async function getCurrentUser() {
  const response = await http.get<User>("/v1/users/me", { throwError: true });

  return response.data;
}

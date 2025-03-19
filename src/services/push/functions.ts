import http from "@/lib/utils/http";
import type { RegisterPushTokenBody, UnregisterPushTokenBody } from "./types";

export async function registerPushToken(body: RegisterPushTokenBody) {
  const response = await http.post("v1/push/register", body);

  return response.data;
}

export async function unregisterPushToken(body: UnregisterPushTokenBody) {
  const response = await http.delete("v1/push/unregister", body);

  return response.data;
}

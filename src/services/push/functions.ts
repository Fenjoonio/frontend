import http from "@/lib/utils/http";
import type { RegisterPushTokenBody, UnregisterPushTokenBody } from "./types";

export async function registerPushToken(body: RegisterPushTokenBody) {
  try {
    const response = await http.post("v1/push/register", body);
    alert(response.data);

    return response.data;
  } catch (error) {
    alert(error);
  }
}

export async function unregisterPushToken(body: UnregisterPushTokenBody) {
  const response = await http.delete("v1/push/unregister", body);

  return response.data;
}

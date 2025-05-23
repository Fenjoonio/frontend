import http from "@/lib/utils/http";
import type {
  GetUserNotificationsParams,
  GetUserNotificationsResponse,
  MarkNotificationAsReadBody,
} from "./types";

export async function getUserNotifications(params: GetUserNotificationsParams) {
  const response = await http.get<GetUserNotificationsResponse>("v1/notifications", {
    searchParams: params,
  });

  return response.data;
}

export async function getUserUnreadNotificationsCount() {
  const response = await http.get<number>("v1/notifications/unread-count");

  return response.data;
}

export async function markNotificationAsRead(body: MarkNotificationAsReadBody) {
  const response = await http.patch<true>("v1/notifications/read", body);

  return response.data;
}

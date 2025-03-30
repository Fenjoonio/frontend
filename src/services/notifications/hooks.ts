import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserNotifications, getUserNotificationsUnreadCount } from "./functions";
import { NOTIFICATIONS_QUERY_KEYS } from "./constants";

export function useGetUserNotifications() {
  return useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_NOTIFICATIONS],
    queryFn: getUserNotifications,
  });
}

export function useGetUserNotificationsUnreadCount() {
  return useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_NOTIFICATIONS_UNREAD_COUNT],
    queryFn: getUserNotificationsUnreadCount,
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationKey: [NOTIFICATIONS_QUERY_KEYS.MARK_NOTIFICATION_AS_READ],
    mutationFn: getUserNotificationsUnreadCount,
  });
}

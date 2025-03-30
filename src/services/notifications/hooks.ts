import { NOTIFICATIONS_QUERY_KEYS } from "./constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserNotifications,
  getUserNotificationsUnreadCount,
  markNotificationAsRead,
} from "./functions";

export function useGetUserNotifications(options?: { enable?: boolean; refetchInterval?: number }) {
  return useQuery({
    ...options,
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_NOTIFICATIONS],
    queryFn: getUserNotifications,
  });
}

export function useGetUserNotificationsUnreadCount(options?: {
  enable?: boolean;
  refetchInterval?: number;
}) {
  return useQuery({
    ...options,
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_NOTIFICATIONS_UNREAD_COUNT],
    queryFn: getUserNotificationsUnreadCount,
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationKey: [NOTIFICATIONS_QUERY_KEYS.MARK_NOTIFICATION_AS_READ],
    mutationFn: markNotificationAsRead,
  });
}

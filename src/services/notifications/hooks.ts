import { NOTIFICATIONS_QUERY_KEYS } from "./constants";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserNotifications,
  getUserNotificationsUnreadCount,
  markNotificationAsRead,
} from "./functions";

export function useGetUserNotifications(options?: { enabled?: boolean; refetchInterval?: number }) {
  return useInfiniteQuery({
    ...options,
    initialPageParam: { page: 1, limit: 10 },
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_NOTIFICATIONS],
    queryFn: ({ pageParam }) => getUserNotifications(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;

      return nextPage <= lastPage.pagination.pages
        ? { page: lastPage.pagination.page + 1, limit: lastPage.pagination.limit }
        : undefined;
    },
  });
}

export function useGetUserNotificationsUnreadCount(options?: {
  enabled?: boolean;
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

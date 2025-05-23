import { NOTIFICATIONS_QUERY_KEYS } from "./constants";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserNotifications,
  getUserUnreadNotificationsCount,
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

export function useGetUnreadNotificationsCount(options?: {
  enabled?: boolean;
  refetchInterval?: number;
}) {
  return useQuery({
    ...options,
    queryKey: [NOTIFICATIONS_QUERY_KEYS.GET_USER_UNREAD_NOTIFICATIONS_COUNT],
    queryFn: getUserUnreadNotificationsCount,
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationKey: [NOTIFICATIONS_QUERY_KEYS.MARK_NOTIFICATION_AS_READ],
    mutationFn: markNotificationAsRead,
  });
}

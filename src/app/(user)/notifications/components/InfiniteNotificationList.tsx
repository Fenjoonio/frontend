"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { ArrowLeftIcon } from "lucide-react";
import PullToRefresh from "@/components/PullToRefresh";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetUserNotifications, useMarkNotificationAsRead } from "@/services/notifications";

type InfiniteNotificationListProps = {
  className?: string;
};

export default function InfiniteNotificationList({ className }: InfiniteNotificationListProps) {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetUserNotifications();

  const notifications = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.notifications ?? []) : [];
  }, [data?.pages]);

  useEffect(() => {
    const notificationsIds = notifications?.map((notification) => notification.id) || [];
    if (notificationsIds.length) {
      markAsRead({ ids: notificationsIds });
    }
  }, [markAsRead, notifications]);

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <PullToRefresh onRefresh={onRefresh} className={className}>
      <InfiniteScroll
        next={fetchNextPage}
        dataLength={notifications.length}
        hasMore={isFetching || hasNextPage}
        loader={
          <>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="pb-5 not-first:pt-5">
                  <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
                  <div className="w-[50%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
                </div>
              ))}
          </>
        }
        endMessage={
          <span className="block text-center text-sm text-soft-foreground mt-8 mb-4">
            به انتهای لیست رسیدی
          </span>
        }
        className="divide-y divide-border"
      >
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            href={notification.url}
            className="flex items-center justify-between pb-5 not-first:pt-5"
          >
            <div className="flex flex-col text-sm">
              <div className="w-fit relative">
                <span className="font-bold">{notification.title}</span>
                {!notification.isRead && (
                  <span className="size-1 absolute top-0 -left-2 bg-danger rounded-sm duration-1000 animate-pulse"></span>
                )}
              </div>

              <span className="text-soft-foreground">{notification.message}</span>
            </div>

            <ArrowLeftIcon className="size-5" />
          </Link>
        ))}
      </InfiniteScroll>
    </PullToRefresh>
  );
}

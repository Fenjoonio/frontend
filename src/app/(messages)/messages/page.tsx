"use client";

import Link from "next/link";
import { useMemo } from "react";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { useGetUserChats } from "@/services/user";
import PullToRefresh from "@/components/PullToRefresh";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MessagesPage() {
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetUserChats();

  const chats = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.chats ?? []) : [];
  }, [data?.pages]);

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <section className="min-h-svh flex flex-col pb-20">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">گفت‌وگو‌های شما</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          از این بخش میتونی گفت‌وگوهایی که تو فنجون داشتی رو ببینی
        </span>
      </div>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-10">
        <InfiniteScroll
          next={fetchNextPage}
          dataLength={chats.length}
          hasMore={isFetching || hasNextPage}
          loader={
            <>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex gap-x-2 pb-4 not-first:pt-4">
                    <div>
                      <div className="size-11 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="flex-1 mt-1">
                      <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
                      <div className="w-40 h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-1"></div>
                    </div>
                  </div>
                ))}
            </>
          }
          className="divide-y divide-border"
        >
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/messages/${chat.id}`}
              className="flex items-center gap-x-2 pb-4 not-first:pt-4"
            >
              <UserAvatar user={chat} className="size-11" />
              <div className="flex gap-y-1 flex-col justify-center">
                <span className="text-sm font-bold">{getUserName(chat)}</span>
                <span className="text-xs text-soft-foreground">{chat.lastMessage.message}</span>
              </div>
            </Link>
          ))}
        </InfiniteScroll>
      </PullToRefresh>
    </section>
  );
}

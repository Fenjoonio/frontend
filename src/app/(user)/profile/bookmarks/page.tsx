"use client";

import { useMemo } from "react";
import BackArrow from "@/components/BackArrow";
import { useGetCurrentUserBookmarks } from "@/services/user";
import PullToRefresh from "@/components/PullToRefresh";
import InfiniteScroll from "react-infinite-scroll-component";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";

export default function ProfileStoriesPage() {
  const { data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetCurrentUserBookmarks();
  const bookmarks = useMemo(() => {
    return data?.pages
      ? data.pages.flatMap((data) => data?.stories ?? [])
      : [];
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
        <h1 className="text-lg font-bold mt-1">لیست علاقه‌مندی ها</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          از این بخش میتونی داستان‌هایی که علاقه داشتی رو ببینی
        </span>
      </div>
      {!isFetching && bookmarks.length === 0 && (
        <p className="text-center text-sm text-muted mt-10">هیچ داستانی ذخیره نشده.</p>
      )}
      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-10">
        <InfiniteScroll
          next={fetchNextPage}
          dataLength={bookmarks.length}
          hasMore={isFetching || hasNextPage}
          loader={
            <>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <StorySkeleton key={index} className="pb-6 not-first:pt-6" />
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
          {bookmarks.map((story) => (
            <Story key={story.id} story={story} className="flex gap-x-2 pb-6 not-first:pt-6" />
          ))}
        </InfiniteScroll>
      </PullToRefresh>
    </section>
  );
}

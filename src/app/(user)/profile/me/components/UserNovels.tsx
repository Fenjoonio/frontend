"use client";

import { useMemo } from "react";
import { useGetCurrentUserNovels } from "@/services/user";
import InfiniteScroll from "react-infinite-scroll-component";
import NovelCard, { NovelCardSkeleton } from "@/app/(story)/components/NovelCard";

export default function UserNovels() {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetCurrentUserNovels();

  const novels = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.items ?? []) : [];
  }, [data?.pages]);

  return (
    <InfiniteScroll
      next={fetchNextPage}
      dataLength={novels.length}
      hasMore={isFetching || hasNextPage}
      loader={
        <>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <NovelCardSkeleton key={index} className="py-4" />
            ))}
        </>
      }
      className="divide-y divide-border"
    >
      {novels.map((novel, index) => (
        <NovelCard key={index} novel={novel} className="py-4" />
      ))}
    </InfiniteScroll>
  );
}

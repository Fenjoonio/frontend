"use client";

import { useMemo } from "react";
import { useGetUserNovelsById } from "@/services/user";
import InfiniteScroll from "react-infinite-scroll-component";
import NovelCard, { NovelCardSkeleton } from "@/app/(story)/components/NovelCard";

type UserNovelsProps = {
  id: number;
};

export default function UserNovels({ id }: UserNovelsProps) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetUserNovelsById({ id: +id });

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

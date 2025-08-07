"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { useGetUserNovelsById } from "@/services/user";
import InfiniteScroll from "react-infinite-scroll-component";
import NoImage from "../../../../../../public/assets/images/no-image.png";

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
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex gap-x-2 pb-6 not-first:pt-6">
                <div>
                  <div className="w-7 h-7 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex-1 mt-1">
                  <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-4"></div>
                  <div className="w-[80%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
                </div>
              </div>
            ))}
        </>
      }
      className="flex gap-4 flex-wrap"
    >
      {novels.map((novel, index) => (
        <div key={novel.id} className="w-[calc(50%-8px)] bg-soft-background py-4 px-3 rounded-md">
          <Link
            href={`/novel/${novel.id}/info`}
            className="block w-full h-48 lg:h-64 relative overflow-hidden rounded-lg"
          >
            <Image
              src={novel.coverImage || NoImage}
              alt={novel.title}
              fill
              sizes="50%"
              priority={index < 4}
            />
          </Link>

          <div className="mt-3">
            <Link
              href={`/novel/${novel.id}`}
              title={novel.title}
              className="block truncate font-semibold"
            >
              {novel.title || `داستان #${novel.id}`}
            </Link>

            <Link
              href={`/author/${novel.user.id}`}
              className="flex gap-x-2 items-center text-sm text-soft-foreground mt-1"
            >
              <UserAvatar user={novel.user} className="size-5 rounded-sm" />
              <span className="mt-1">{getUserName(novel.user)}</span>
            </Link>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}

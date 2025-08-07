"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PlusIcon } from "lucide-react";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { useGetInfiniteNovels } from "@/services/novels";
import InfiniteScroll from "react-infinite-scroll-component";
import NovelCard, { NovelCardSkeleton } from "../components/NovelCard";

export default function LibraryPage() {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetInfiniteNovels({ limit: 20 });

  const novels = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.novels ?? []) : [];
  }, [data?.pages]);

  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">کتابخانه</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          فرقی نداره داستان کوتاه دوست داری یا بلند، اینجا همه جورش رو پیدا می‌کنی!
        </span>
      </div>

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
        className="divide-y divide-border px-5 mt-5"
      >
        {novels.map((novel, index) => (
          <NovelCard key={index} novel={novel} className="py-4" />
        ))}
      </InfiniteScroll>

      <Link href="/novel/new">
        <Button
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
          className="w-14 fixed left-4"
        >
          <PlusIcon className="size-5" />
        </Button>
      </Link>
    </section>
  );
}

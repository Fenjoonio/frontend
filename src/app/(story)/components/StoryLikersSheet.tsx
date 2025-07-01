"use client";

import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { useGetStoryLikers } from "@/services/stories";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

type StoryLikersSheetProps = {
  storyId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StoryLikersSheet({ storyId, isOpen, onOpenChange }: StoryLikersSheetProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useGetStoryLikers(
    { id: storyId },
    { enabled: isOpen }
  );

  const users = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.users ?? []) : [];
  }, [data?.pages]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="pb-4">
        <SheetHeader>
          <SheetTitle>لایک‌ها</SheetTitle>
          <SheetDescription>لیست کسانی که داستان شما رو پسندیدن</SheetDescription>
        </SheetHeader>
        <div
          id="scrollableDiv"
          className="overflow-y-auto scrollbar-none"
          style={{ height: "300px", padding: "1px" }}
        >
          <InfiniteScroll
            next={fetchNextPage}
            dataLength={users.length}
            hasMore={isFetching || hasNextPage}
            scrollableTarget="scrollableDiv"
            loader={
              <>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-2 pb-6 not-first:pt-6"
                    >
                      <div>
                        <div className="size-7 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <div
                          className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
              </>
            }
            className="divide-y divide-border"
          >
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/author/${user.id}`}
                className="flex gap-x-2 items-center gap-2 py-4"
              >
                <UserAvatar user={user} />
                <span>{getUserName(user)}</span>
                <ArrowLeftIcon className="size-5 ms-auto" />
              </Link>
            ))}
          </InfiniteScroll>
        </div>
      </SheetContent>
    </Sheet>
  );
}

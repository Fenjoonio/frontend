"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { useGetUserFollowingList } from "@/services/user";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type UserFollowingsListSheetProps = {
  userId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function UserFollowingsListSheet({
  userId,
  isOpen,
  onOpenChange,
}: UserFollowingsListSheetProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useGetUserFollowingList(
    { id: userId },
    { enabled: isOpen }
  );

  const users = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.followings ?? []) : [];
  }, [data?.pages]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="pb-4">
        <SheetHeader>
          <SheetTitle>دنبال شدگان</SheetTitle>
          <SheetDescription>لیست کسانی که شما آن‌ها رو دنبال می‌کنید</SheetDescription>
        </SheetHeader>

        <InfiniteScroll
          next={fetchNextPage}
          dataLength={users.length}
          hasMore={isFetching || hasNextPage}
          loader={
            <>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center gap-x-2 pb-6 not-first:pt-6">
                    <div>
                      <div className="size-7 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
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
      </SheetContent>
    </Sheet>
  );
}

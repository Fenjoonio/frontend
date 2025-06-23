"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HomeSlider from "./components/HomeSlider";
import PullToRefresh from "@/components/PullToRefresh";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import { useGetInfiniteStories } from "@/services/stories";
import { BellIcon, PenIcon, SendIcon } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetUserUnreadMessagesCount } from "@/services/messages";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";
import { useGetUnreadNotificationsCount } from "@/services/notifications";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStories({
    page: 1,
    limit: 10,
  });

  const { data: unreadNotificationsCount } = useGetUnreadNotificationsCount({
    enabled: isLoggedIn,
    refetchInterval: 5000,
  });

  const { data: unreadMessagesCount } = useGetUserUnreadMessagesCount({
    enabled: isLoggedIn,
    refetchInterval: 5000,
  });

  const stories = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.stories ?? []) : [];
  }, [data?.pages]);

  const openAddStoryModalIfLoggedIn = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/");
      return;
    }

    setIsModalOpen(true);
    sendGAEvent("add_story", "click", { location: "home" });
  };

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 20px)" }}
        className="w-[calc(100%-1px)] flex items-center justify-between sticky top-0 right-0 z-10 bg-background border-b border-border pb-4 px-5"
      >
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-extrabold">فنجون</h1>
          <span className="text-soft-foreground">#ایران</span>
        </div>

        <div className="flex gap-x-6 items-center">
          <Link href="/notifications" className="relative">
            {Number(unreadNotificationsCount) > 0 && (
              <span className="size-[6px] absolute bottom-1 right-0 bg-danger rounded-sm"></span>
            )}

            <BellIcon className="size-5 cursor-pointer" />
          </Link>

          <Link href="/messages" className="relative">
            {Number(unreadMessagesCount) > 0 && (
              <span className="size-[6px] absolute bottom-1 right-0 bg-danger rounded-sm"></span>
            )}

            <SendIcon className="size-5 cursor-pointer" />
          </Link>
        </div>
      </header>

      <HomeSlider className="mt-4" />

      <h3 className="text-sm text-soft-foreground mt-6 px-5">آخرین داستان‌ها</h3>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        <InfiniteScroll
          next={fetchNextPage}
          dataLength={stories.length}
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
          {stories.map((story) => (
            <Story key={story.id} story={story} className="flex gap-x-2 pb-6 not-first:pt-6" />
          ))}
        </InfiniteScroll>
      </PullToRefresh>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 p-4 bg-primary text-light-gray-100 rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="size-5" />
      </button>
    </div>
  );
}

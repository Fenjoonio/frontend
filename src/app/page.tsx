"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HomeSlider from "./components/HomeSlider";
import { BellIcon, PenIcon } from "lucide-react";
import Story, { StorySkeleton } from "@/app/(story)/components/Story";
import PullToRefresh from "@/components/PullToRefresh";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import { useGetInfiniteStories } from "@/services/stories";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";
import { useGetUserNotificationsUnreadCount } from "@/services/notifications";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStories({
    page: 1,
    limit: 10,
  });

  const { data: notificationsUnreadCount } = useGetUserNotificationsUnreadCount({
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
        <h1 className="text-xl font-extrabold">
          فنجون <span className="text-xs font-semibold ms-1">#بندر_عباس</span>
        </h1>

        <Link href="/notifications" className="relative">
          {Number(notificationsUnreadCount) > 0 && (
            <span className="size-[6px] absolute bottom-1 right-0 bg-danger rounded-sm"></span>
          )}

          <BellIcon className="w-5 h-5 cursor-pointer" />
        </Link>
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

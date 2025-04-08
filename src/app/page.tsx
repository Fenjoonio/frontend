"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import PullToRefresh from "@/components/PullToRefresh";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import { Story, useGetInfiniteStories } from "@/services/stories";
import StoryLikeButton from "./(story)/components/StoryLikeButton";
import ShareStorySheet from "./(story)/components/ShareStorySheet";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";
import { useGetUserNotificationsUnreadCount } from "@/services/notifications";
import { BellIcon, MessageSquareTextIcon, PenIcon, Share2Icon } from "lucide-react";
import NotificationsSheet from "@/app/(user)/notifications/components/NotificationsSheet";
import HomeSlider from "./components/HomeSlider";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedStoryId, setSharedStoryId] = useState(0);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStories({
    page: 1,
    limit: 10,
  });

  const { data: notificationsUnreadCount } = useGetUserNotificationsUnreadCount({
    enabled: isLoggedIn,
    refetchInterval: 5000,
  });

  const stories = useMemo<Story[]>(() => {
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

  const openNotificationsSheetIfLoggedIn = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/");
      return;
    }

    setIsNotificationSheetOpen(true);
  };

  const onRefresh = async () => {
    await refetch();
  };

  const share = (storyId: number) => {
    setSharedStoryId(storyId);
    setIsShareSheetOpen(true);
  };

  return (
    <div className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 20px)" }}
        className="w-[calc(100%-1px)] flex items-center justify-between sticky top-0 right-0 z-10 bg-background border-b border-border pb-4 px-5"
      >
        <h1 className="text-xl font-extrabold">فنجون</h1>

        <div className="relative" onClick={openNotificationsSheetIfLoggedIn}>
          {Number(notificationsUnreadCount) > 0 && (
            <span className="size-[6px] absolute bottom-1 right-0 bg-danger rounded-sm"></span>
          )}

          <BellIcon className="w-5 h-5 cursor-pointer" />
        </div>
      </header>

      <HomeSlider className="mt-4" />

      <h3 className="text-sm text-soft-foreground mt-6 px-5">آخرین داستان‌ها</h3>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        <section className="divide-y divide-border">
          {stories.map((story) => (
            <div key={story.id} className="flex gap-x-2 pb-6 not-first:pt-6">
              <Link href={`/author/${story.user.id}`}>
                <UserAvatar user={story.user} />
              </Link>

              <div className="flex-1 mt-1">
                <div className="flex gap-x-2 items-center">
                  <Link href={`/author/${story.user.id}`}>
                    <span className="font-bold">{getUserName(story.user)}</span>
                  </Link>
                  <span className="size-1 bg-gray-300 dark:bg-border rounded-sm"></span>
                  <span className="text-[10px] text-light-gray-900 dark:text-soft-foreground">
                    {formatStoryCreateAt(story.createdAt)}
                  </span>
                </div>

                <Link href={`/story/${story.id}`}>
                  <p className="w-full text-sm text-soft-foreground whitespace-pre-line line-clamp-6 leading-6 mt-1">
                    {story.text}
                  </p>
                </Link>

                <div className="flex items-center gap-x-4 mt-4">
                  <div className="flex items-center gap-x-2">
                    <StoryLikeButton
                      storyId={story.id}
                      isLikedByUser={story.isLikedByUser}
                      className="w-5 h-5 text-soft-foreground"
                    />
                    <span className="text-sm text-soft-foreground">{story.likesCount}</span>
                  </div>

                  <Link href={`/story/${story.id}#comments`} className="flex items-center gap-x-2">
                    <MessageSquareTextIcon className="w-5 h-5 text-soft-foreground" />
                    <span className="text-sm text-soft-foreground">{story.commentsCount}</span>
                  </Link>

                  <Share2Icon
                    className="w-5 h-5 text-soft-foreground ms-auto"
                    onClick={() => share(story.id)}
                  />
                </div>
              </div>
            </div>
          ))}

          {isFetching && (
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
          )}
        </section>
      </PullToRefresh>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 p-4 bg-primary text-light-gray-100 rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="size-5" />
      </button>

      {hasNextPage && !isFetching && (
        <Button
          variant="ghost"
          className="w-[calc(100%-40px)] mx-5"
          onClick={() => fetchNextPage()}
        >
          صفحه بعد
        </Button>
      )}

      {isShareSheetOpen && (
        <ShareStorySheet
          storyId={sharedStoryId}
          isOpen={isShareSheetOpen}
          onOpenChange={setIsShareSheetOpen}
        />
      )}

      {isNotificationSheetOpen && (
        <NotificationsSheet
          isOpen={isNotificationSheetOpen}
          onOpenChange={setIsNotificationSheetOpen}
        />
      )}
    </div>
  );
}

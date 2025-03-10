"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { Swiper, SwiperSlide } from "swiper/react";
import PullToRefresh from "@/components/PullToRefresh";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useAuthContext } from "@/providers/AuthProvider";
import { MessageSquareTextIcon, PenIcon } from "lucide-react";
import { Story, useGetInfiniteStories } from "@/services/stories";
import StoryLikeButton from "./(story)/components/StoryLikeButton";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isPending } = useGetInfiniteStories({
    page: 1,
    limit: 5,
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
  };

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <div className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 20px)" }}
        className="flex items-end sticky top-0 z-10 bg-[#3a3a3a] pb-4 px-5"
      >
        <h1 className="text-xl font-extrabold">فنجون</h1>
      </header>

      <Swiper loop className="mt-4">
        <SwiperSlide className="px-5">
          <Link
            href="/"
            className="w-full h-48 flex flex-col justify-center items-center bg-[#B07B56] rounded-sm"
          >
            <span className="text-xl font-black">دیگه وقتشه!</span>
            <span className="text-xl font-black">همین الان نوشتن رو شروع کن!</span>
            <span className="bg-white text-[#B07B56] rounded-sm py-1 px-6 mt-4">بزن بریم!</span>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="px-5">
          <Link
            href="/"
            className="w-full h-48 flex flex-col justify-center items-center bg-[#466F4F] rounded-sm"
          >
            <span className="text-xl font-black">دیگه وقتشه!</span>
            <span className="text-xl font-black">همین الان نوشتن رو شروع کن!</span>
            <span className="bg-white text-[#466F4F] rounded-sm py-1 px-6 mt-4">بزن بریم!</span>
          </Link>
        </SwiperSlide>
      </Swiper>

      <h3 className="text-sm text-[#B0B0B0] mt-6 px-5">آخرین داستان‌ها</h3>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex gap-x-2 pb-6 not-first:pt-6 not-first:border-t border-[#505050]"
          >
            <UserAvatar user={story.user} />

            <div className="flex-1">
              <Link href={`/story/${story.id}`}>
                <div className="flex gap-x-2 items-center">
                  <span className="font-bold">{getUserName(story.user)}</span>
                  <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
                  <span className="text-[10px] text-[#B0B0B0]">
                    {formatStoryCreateAt(story.createdAt)}
                  </span>
                </div>

                {/* NOTE: I used padding-bottom to make more room to touch for the user */}
                <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 pb-4 mt-1">
                  {story.text}
                </p>
              </Link>

              <div className="flex gap-x-4">
                <div className="flex items-center gap-x-2">
                  <StoryLikeButton
                    storyId={story.id}
                    isLikedByUser={story.isLikedByUser}
                    className="w-5 h-5 text-[#B0B0B0]"
                  />
                  <span className="text-sm text-[#B0B0B0]">{story.likesCount}</span>
                </div>

                <div className="flex items-center gap-x-2">
                  <MessageSquareTextIcon className="w-5 h-5 text-[#B0B0B0]" />
                  <span className="text-sm text-[#B0B0B0]">{story.commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isPending && (
          <div className="flex flex-col gap-y-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex gap-x-2 pb-6 not-first:pt-6 not-first:border-t border-[#505050]"
                >
                  <div>
                    <div className="w-7 h-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
                    <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
                    <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </PullToRefresh>

      <CreateNewStoryDialog open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        className="fixed bottom-20 left-4 p-4 bg-[#9C6B4A] rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="w-5 h-5" />
      </button>

      {hasNextPage && (
        <Button
          variant="ghost"
          className="w-[calc(100%-40px)] mx-5"
          onClick={() => fetchNextPage()}
        >
          صفحه بعد
        </Button>
      )}
    </div>
  );
}

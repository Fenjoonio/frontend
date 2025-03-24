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
import { Story, useGetInfiniteStories } from "@/services/stories";
import StoryLikeButton from "./(story)/components/StoryLikeButton";
import ShareStorySheet from "./(story)/components/ShareStorySheet";
import { MessageSquareTextIcon, PenIcon, Share2Icon } from "lucide-react";
import CreateNewStoryDialog from "./(story)/components/CreateNewStoryDialog";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedStoryId, setSharedStoryId] = useState(0);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStories({
    page: 1,
    limit: 10,
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

  const share = (storyId: number) => {
    setSharedStoryId(storyId);
    setIsShareSheetOpen(true);
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
            href="https://github.com/freakingeek/fenjoon-app/releases/download/0.1.2/Fenjoon-v0.1.2.apk"
            className="w-full h-48 flex flex-col justify-center items-center bg-[#466F4F] rounded-sm"
          >
            <span className="text-xl font-black">فنجون جدید رسید!</span>
            <span className="text-xl font-black mt-1">آخرین نسخه رو از اینجا نصب کن</span>
            <span className="bg-white text-[#466F4F] rounded-sm py-1 px-6 mt-4">لینک دانلود</span>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="px-5">
          <Link
            href="https://survey.porsline.ir/s/NjmYt7vS"
            className="w-full h-48 flex flex-col justify-center items-center bg-[#B07B56] rounded-sm"
          >
            <span className="text-xl text-center font-black">
              لایک و کامنت اومد به فنجون <br /> بعدی رو تو بگو!
            </span>
            <span className="bg-white text-[#B07B56] rounded-sm py-1 px-6 mt-4">بزن بریم!</span>
          </Link>
        </SwiperSlide>
      </Swiper>

      <h3 className="text-sm text-[#B0B0B0] mt-6 px-5">آخرین داستان‌ها</h3>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        <section className="divide-y divide-[#505050]">
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
                  <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
                  <span className="text-[10px] text-[#B0B0B0]">
                    {formatStoryCreateAt(story.createdAt)}
                  </span>
                </div>

                <Link href={`/story/${story.id}`}>
                  <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 mt-1">
                    {story.text}
                  </p>
                </Link>

                <div className="flex items-center gap-x-4 mt-4">
                  <div className="flex items-center gap-x-2">
                    <StoryLikeButton
                      storyId={story.id}
                      isLikedByUser={story.isLikedByUser}
                      className="w-5 h-5 text-[#B0B0B0]"
                    />
                    <span className="text-sm text-[#B0B0B0]">{story.likesCount}</span>
                  </div>

                  <Link href={`/story/${story.id}#comments`} className="flex items-center gap-x-2">
                    <MessageSquareTextIcon className="w-5 h-5 text-[#B0B0B0]" />
                    <span className="text-sm text-[#B0B0B0]">{story.commentsCount}</span>
                  </Link>

                  <Share2Icon
                    className="w-5 h-5 text-[#B0B0B0] ms-auto"
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
                      <div className="w-7 h-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="flex-1 mt-1">
                      <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
                      <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
                      <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
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
        className="fixed left-4 p-4 bg-[#9C6B4A] rounded-lg cursor-pointer"
        onClick={openAddStoryModalIfLoggedIn}
      >
        <PenIcon className="w-5 h-5" />
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
    </div>
  );
}

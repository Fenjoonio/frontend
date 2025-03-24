"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import ReplyDialog from "./components/ReplyDialog";
import PullToRefresh from "@/components/PullToRefresh";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useAuthContext } from "@/providers/AuthProvider";
import StoryLikeButton from "@/app/(story)/components/StoryLikeButton";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";
import { MessageSquareTextIcon, PenIcon, Share2Icon } from "lucide-react";
import { Comment, useGetSingleStory, useGetInfiniteStoryComments } from "@/services/stories";

const STORY_ID = 64;

// TODO: SSR this page (get first story server side)
export default function ThreadPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedStoryId, setSharedStoryId] = useState(0);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const { data: story, isFetching: isStoryFetching } = useGetSingleStory({ id: STORY_ID });
  const { data, refetch, fetchNextPage, hasNextPage, isFetching } = useGetInfiniteStoryComments({
    id: String(STORY_ID),
    page: 1,
    limit: 10,
  });

  const comments = useMemo<Comment[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  const openReplyDialog = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/thread");
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
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="flex items-end justify-between bg-[#2e2e2e]/40 backdrop-blur-xs sticky top-0 z-10 pb-3 px-2"
      >
        <BackArrow />
      </header>

      <div className="px-5 mt-4">
        <h1 className="text-lg font-bold">به {"'بافته'"} خوش اومدی!</h1>
        <span className="block text-sm text-[#B0B0B0] mt-1">
          اینجا داستان‌ها در هم تنیده میشن! هر هفته داستان جدیدی اینجا قرار میگیره که ادامه اون رو
          تو می‌بافی ...
        </span>
      </div>

      <div className="border-b border-[#505050] mt-16 mx-5">
        {story && !isStoryFetching ? (
          <div key={story.id} className="flex gap-x-2 pb-6 not-first:pt-6">
            {/* <Link href={`/author/${story.user.id}`}>
              <UserAvatar user={story.user} />
            </Link> */}

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
        ) : (
          <div className="flex gap-x-2 pb-6 not-first:pt-6">
            <div>
              <div className="w-7 h-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex-1 mt-1">
              <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
              <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
            </div>
          </div>
        )}
      </div>

      <PullToRefresh onRefresh={onRefresh} className="mx-5">
        <section className="divide-y divide-[#505050]">
          {comments.map((story) => (
            <div key={story.id} className="flex gap-x-2 pb-6 pt-6">
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

                <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 mt-1">
                  {story.text}
                </p>
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

      <ReplyDialog storyId={STORY_ID} open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 p-4 bg-[#9C6B4A] rounded-lg cursor-pointer"
        onClick={openReplyDialog}
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
    </section>
  );
}

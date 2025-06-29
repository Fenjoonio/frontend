"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BackArrow from "@/components/BackArrow";
import { getUserName } from "@/lib/utils/users";
import { Comment } from "@/components/Comment";
import ReplyDialog from "./components/ReplyDialog";
import { StorySkeleton } from "../components/Story";
import { useEffect, useMemo, useState } from "react";
import PullToRefresh from "@/components/PullToRefresh";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import StoryLikeButton from "@/app/(story)/components/StoryLikeButton";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";
import { MessageSquareTextIcon, PenIcon, Share2Icon } from "lucide-react";
import { useGetSingleStory, useGetInfiniteStoryComments } from "@/services/stories";

const STORY_ID = 301;

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

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  const openReplyDialog = () => {
    if (!isLoggedIn) {
      router.push("/accounts/login?redirect=/thread");
      return;
    }

    setIsModalOpen(true);
    sendGAEvent("add_story", "click", { location: "thread" });
  };

  const onRefresh = async () => {
    await refetch();
  };

  const share = (storyId: number) => {
    setSharedStoryId(storyId);
    setIsShareSheetOpen(true);
  };

  useEffect(() => {
    sendGAEvent("view_thread", "view", { location: "thread" });
  }, []);

  return (
    <section className="pb-4">
      <header
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
        className="w-[calc(100%-1px)] flex items-center sticky top-0 right-0 z-10 bg-background border-b border-border pb-3 px-2"
      >
        <BackArrow />
        <h1 className="text-lg font-bold mt-1">بافته</h1>
      </header>

      <div className="px-5 mt-4">
        <span className="block text-sm text-soft-foreground mt-1">
          اینجا داستان‌ها در هم تنیده میشن! هر هفته داستان جدیدی اینجا قرار میگیره که ادامه اون رو
          تو می‌بافی ...
        </span>
      </div>

      <div className="border-b border-border mt-16 mx-5">
        {story && !isStoryFetching ? (
          <div key={story.id} className="flex gap-x-2 pb-6 not-first:pt-6">
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
                <StoryLikeButton
                  storyId={story.id}
                  likesCount={story.likesCount}
                  isLikedByUser={story.isLikedByUser}
                  className="size-5 text-soft-foreground"
                />

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
        ) : (
          <div className="flex gap-x-2 pb-6 not-first:pt-6">
            <div>
              <div className="size-7 bg-gray-300 dark:bg-border opacity-40 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex-1 mt-1">
              <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-4"></div>
              <div className="w-[80%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
            </div>
          </div>
        )}
      </div>

      <PullToRefresh onRefresh={onRefresh} className="mx-5 mt-4">
        <InfiniteScroll
          next={fetchNextPage}
          dataLength={comments.length}
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
          className="divide-y divide-border"
        >
          {comments.toReversed().map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              className="flex gap-x-2 pb-6 not-first:pt-6"
            />
          ))}
        </InfiniteScroll>
      </PullToRefresh>

      <ReplyDialog storyId={STORY_ID} open={isModalOpen} onOpenChange={setIsModalOpen} />

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 p-4 bg-primary text-light-gray-100 rounded-lg cursor-pointer"
        onClick={openReplyDialog}
      >
        <PenIcon className="size-5" />
      </button>

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

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Story } from "@/services/stories";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useGetUserStoriesById } from "@/services/user";
import { MessageSquareTextIcon, Share2Icon } from "lucide-react";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";
import StoryLikeButton from "@/app/(story)/components/StoryLikeButton";

type UserStoriesProps = {
  id: number;
};

export default function UserStories({ id }: UserStoriesProps) {
  const [sharedStoryId, setSharedStoryId] = useState(0);
  const { data, isFetching } = useGetUserStoriesById({ id });
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  const stories = useMemo<Story[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.stories ?? []) : [];
  }, [data?.pages]);

  const share = (storyId: number) => {
    setSharedStoryId(storyId);
    setIsShareSheetOpen(true);
  };

  return (
    <>
      <section className="divide-y divide-[#505050]">
        {stories.map((story) => (
          <div key={story.id} className="flex gap-x-2 pb-6 not-first:pt-6">
            <UserAvatar user={story.user} />

            <div className="flex-1 mt-1">
              <Link href={`/story/${story.id}`}>
                <div className="flex gap-x-2 items-center">
                  <span className="font-bold">{getUserName(story.user)}</span>
                  <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
                  <span className="text-[10px] text-[#B0B0B0]">
                    {formatStoryCreateAt(story.createdAt)}
                  </span>
                </div>

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

      {isShareSheetOpen && (
        <ShareStorySheet
          storyId={sharedStoryId}
          isOpen={isShareSheetOpen}
          onOpenChange={setIsShareSheetOpen}
        />
      )}
    </>
  );
}

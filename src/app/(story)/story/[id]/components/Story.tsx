"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { useGetSingleStory } from "@/services/stories";
import { formatStoryCreateAt } from "@/lib/utils/story";
import StoryLikeButton from "@/app/(story)/components/StoryLikeButton";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";
import { Share2Icon } from "lucide-react";

type StoryProps = {
  id: string;
};

export default function Story({ id }: StoryProps) {
  const [showFullText, setShowFullText] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const { data: story, isPending, isFetched } = useGetSingleStory({ id: +id });
  const hasStory = story && Object.keys(story).length;

  if (isFetched && !hasStory) {
    notFound();
  }

  if (isPending || !hasStory) {
    return (
      <div className="w-full p-5">
        <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
        <div className="w-[80%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
        <div className="w-[40%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-2"></div>
      </div>
    );
  }

  return (
    <div key={story.id} className="w-full p-5">
      <div className="flex gap-x-2 items-center">
        <span className="font-bold">{getUserName(story.user)}</span>
        <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
        <span className="text-[10px] text-[#B0B0B0]">{formatStoryCreateAt(story.createdAt)}</span>
      </div>

      <p
        className={cn("w-full text-sm text-[#B0B0B0] whitespace-pre-line leading-6 mt-2", {
          "line-clamp-6": !showFullText,
        })}
        onClick={() => setShowFullText(!showFullText)}
      >
        {story.text}
      </p>

      {story.text.split("\n").length > 6 && (
        <span
          className="block text-center cursor-pointer mt-10"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "نمایش بخشی از داستان" : "نمایش تمام داستان"}
        </span>
      )}

      <div className="flex items-center gap-x-4 mt-8">
        <div className="flex items-center gap-x-2">
          <StoryLikeButton
            storyId={story.id}
            isLikedByUser={story.isLikedByUser}
            className="w-5 h-5 text-[#B0B0B0]"
          />
          <span className="text-sm text-[#B0B0B0]">{story.likesCount}</span>
        </div>

        <div className="flex items-center gap-x-2">
          <Share2Icon
            className="w-5 h-5 text-[#B0B0B0] ms-auto"
            onClick={() => setIsShareSheetOpen(true)}
          />
          <span className="text-sm text-[#B0B0B0]">{story.sharesCount}</span>
        </div>
      </div>

      {isShareSheetOpen && (
        <ShareStorySheet
          storyId={story.id}
          isOpen={isShareSheetOpen}
          onOpenChange={setIsShareSheetOpen}
        />
      )}
    </div>
  );
}

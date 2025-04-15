"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, MessageSquareTextIcon, Share2Icon } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { useGetSingleStory } from "@/services/stories";
import { formatStoryCreateAt } from "@/lib/utils/story";
import StoryLikeButton from "@/app/(story)/components/StoryLikeButton";
import ShareStorySheet from "@/app/(story)/components/ShareStorySheet";

type StoryProps = {
  id: string;
};

export default function Story({ id }: StoryProps) {
  const [showFullText, setShowFullText] = useState(true);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const { data: story, isPending, isFetched } = useGetSingleStory({ id: +id });
  const hasStory = story && Object.keys(story).length;

  if (isFetched && !hasStory) {
    notFound();
  }

  if (isPending || !hasStory) {
    return (
      <div className="w-full p-5">
        <div className="w-20 h-4 bg-gray-300 dark:bg-border opacity-40 rounded-full animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-4"></div>
        <div className="w-[80%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
        <div className="w-[40%] h-4 bg-gray-300 dark:bg-border opacity-20 rounded-full animate-pulse mt-2"></div>
      </div>
    );
  }

  const ShowMoreIcon = showFullText ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div key={story.id} className="w-full p-5">
      <div className="flex gap-x-2 items-center">
        <Link href={`/author/${story.user.id}`}>
          <span className="font-bold">{getUserName(story.user)}</span>
        </Link>
        <span className="size-1 bg-gray-300 dark:bg-border rounded-sm"></span>
        <span className="text-[10px] text-light-gray-900 dark:text-soft-foreground">
          {formatStoryCreateAt(story.createdAt)}
        </span>
      </div>

      <p
        className={cn("w-full min-h-20 text-sm whitespace-pre-line leading-6 mt-2", {
          "line-clamp-6": !showFullText,
        })}
        onClick={() => setShowFullText(!showFullText)}
      >
        {story.text}
      </p>

      {story.text.split("\n").length > 6 && (
        <span
          className="flex gap-x-1 justify-center items-center text-xs text-soft-foreground cursor-pointer mt-6"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "نمایش بخشی از داستان" : "نمایش تمام داستان"}
          <ShowMoreIcon className="size-4" />
        </span>
      )}

      <div className="grid grid-cols-3 divide-x divide-border mt-10">
        <StoryLikeButton
          storyId={story.id}
          likesCount={story.likesCount}
          isLikedByUser={story.isLikedByUser}
          className="size-6 text-soft-foreground"
          containerClass="flex gap-y-3 flex-col justify-center items-center"
        />

        <div className="flex gap-y-3 flex-col justify-center items-center">
          <MessageSquareTextIcon className="size-6 text-soft-foreground" />
          <span className="text-sm text-soft-foreground">{story.commentsCount || "۰"}</span>
        </div>

        <div className="flex gap-y-3 flex-col justify-center items-center">
          <Share2Icon
            className="size-6 text-soft-foreground"
            onClick={() => setIsShareSheetOpen(true)}
          />
          <span className="text-sm text-soft-foreground">{story.sharesCount || "۰"}</span>
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

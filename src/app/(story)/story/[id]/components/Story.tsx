"use client";

import Link from "next/link";
import { useState } from "react";
import { Share2Icon } from "lucide-react";
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
        className={cn("w-full text-sm text-soft-foreground whitespace-pre-line leading-6 mt-2", {
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
        <StoryLikeButton
          storyId={story.id}
          likesCount={story.likesCount}
          isLikedByUser={story.isLikedByUser}
          className="w-5 h-5 text-soft-foreground"
        />

        <div className="flex items-center gap-x-2">
          <Share2Icon
            className="w-5 h-5 text-soft-foreground ms-auto"
            onClick={() => setIsShareSheetOpen(true)}
          />
          <span className="text-sm text-soft-foreground">{story.sharesCount}</span>
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

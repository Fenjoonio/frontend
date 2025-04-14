"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { getUserName } from "@/lib/utils/users";
import { type Story } from "@/services/stories";
import ShareStorySheet from "./ShareStorySheet";
import StoryLikeButton from "./StoryLikeButton";
import UserAvatar from "@/components/UserAvatar";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { MessageSquareTextIcon, Share2Icon } from "lucide-react";

type StoryProps = {
  story: Story;
  showProfile?: boolean;
  className?: string;
};

export default function Story({ story, showProfile, className }: StoryProps) {
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  const share = () => {
    setIsShareSheetOpen(true);
  };

  return (
    <>
      <div className={cn("flex gap-x-2", className)}>
        {showProfile && (
          <Link href={`/author/${story.user.id}`}>
            <UserAvatar user={story.user} />
          </Link>
        )}

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
              className="w-5 h-5 text-soft-foreground"
            />

            <Link href={`/story/${story.id}#comments`} className="flex items-center gap-x-2">
              <MessageSquareTextIcon className="w-5 h-5 text-soft-foreground" />
              <span className="text-sm text-soft-foreground">{story.commentsCount}</span>
            </Link>

            <Share2Icon className="w-5 h-5 text-soft-foreground ms-auto" onClick={share} />
          </div>
        </div>
      </div>

      {isShareSheetOpen && (
        <ShareStorySheet
          storyId={story.id}
          isOpen={isShareSheetOpen}
          onOpenChange={setIsShareSheetOpen}
        />
      )}
    </>
  );
}

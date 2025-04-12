"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import { sendGAEvent } from "@next/third-parties/google";
import { useDislikeStory, useLikeStory } from "@/services/stories";
import StoryLikersSheet from "./StoryLikersSheet";

type StoryLikeButtonProps = {
  storyId: number;
  likesCount: number;
  className?: string;
  isLikedByUser: boolean;
  showLikesCount?: boolean;
};

export default function StoryLikeButton({
  storyId,
  likesCount = 0,
  className,
  isLikedByUser,
  showLikesCount = true,
}: StoryLikeButtonProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLikedByUser);
  const [isLikersSheetOpen, setIsLikersSheetOpen] = useState(false);
  const { mutate: like, isPending: isLikePending } = useLikeStory(
    { id: storyId },
    {
      onSuccess: () => {
        setLocalIsLiked(true);
        sendGAEvent("event", "like_story_click", { storyId });
      },
    }
  );
  const { mutate: dislike, isPending: isDislikePending } = useDislikeStory(
    { id: storyId },
    {
      onSuccess: () => {
        setLocalIsLiked(false);
        sendGAEvent("event", "dislike_story_click", { storyId });
      },
    }
  );

  const onHeartClick = () => {
    if (isLikePending || isDislikePending) return;

    const action = isLikedByUser ? dislike : like;
    action();
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <HeartIcon
          className={cn(
            "cursor-pointer",
            { "opacity-50": isLikePending || isDislikePending },
            { "fill-danger stroke-danger": localIsLiked },
            className
          )}
          onClick={onHeartClick}
        />

        {showLikesCount && (
          <div role="button" className="cursor-pointer" onClick={() => setIsLikersSheetOpen(true)}>
            <span className="text-sm text-soft-foreground">{likesCount}</span>
          </div>
        )}
      </div>

      <StoryLikersSheet
        storyId={storyId}
        isOpen={isLikersSheetOpen}
        onOpenChange={setIsLikersSheetOpen}
      />
    </>
  );
}

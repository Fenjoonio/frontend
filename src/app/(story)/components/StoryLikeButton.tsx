"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import { sendGAEvent } from "@next/third-parties/google";
import { useDislikeStory, useLikeStory } from "@/services/stories";

type StoryLikeButtonProps = {
  storyId: number;
  className?: string;
  isLikedByUser: boolean;
};

export default function StoryLikeButton({
  storyId,
  className,
  isLikedByUser,
}: StoryLikeButtonProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLikedByUser);
  const { mutate: like, isPending: isLikePending } = useLikeStory(
    { id: storyId },
    {
      onSuccess: () => {
        setLocalIsLiked(true);
      },
    }
  );
  const { mutate: dislike, isPending: isDislikePending } = useDislikeStory(
    { id: storyId },
    {
      onSuccess: () => {
        setLocalIsLiked(false);
      },
    }
  );

  const onHeartClick = () => {
    if (isLikePending || isDislikePending) return;

    const action = isLikedByUser ? dislike : like;
    action();
    sendGAEvent(isLikedByUser ? "unlike_story" : "like_story", "click", { storyId });
  };

  return (
    <HeartIcon
      className={cn(
        "cursor-pointer",
        { "opacity-50": isLikePending || isDislikePending },
        { "fill-danger stroke-danger": localIsLiked },
        className
      )}
      onClick={onHeartClick}
    />
  );
}

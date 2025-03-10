"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
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
  };

  return (
    <HeartIcon
      className={cn(
        "cursor-pointer",
        { "opacity-50": isLikePending || isDislikePending },
        { "fill-[#C46B5A] stroke-[#C46B5A]": localIsLiked },
        className
      )}
      onClick={onHeartClick}
    />
  );
}

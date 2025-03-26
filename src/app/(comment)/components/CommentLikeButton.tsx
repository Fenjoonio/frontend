"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import { useDislikeComment, useLikeComment } from "@/services/comments";

type CommentLikeButtonProps = {
  commentId: number;
  className?: string;
  isLikedByUser: boolean;
  onChange?: (isLiked: boolean) => void;
};

export default function CommentLikeButton({
  commentId,
  className,
  isLikedByUser,
  onChange,
}: CommentLikeButtonProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLikedByUser);
  const { mutate: like, isPending: isLikePending } = useLikeComment(
    { id: commentId },
    {
      onSuccess: () => {
        setLocalIsLiked(true);
        onChange?.(true);
      },
    }
  );
  const { mutate: dislike, isPending: isDislikePending } = useDislikeComment(
    { id: commentId },
    {
      onSuccess: () => {
        setLocalIsLiked(false);
        onChange?.(false);
      },
    }
  );

  const onHeartClick = () => {
    if (isLikePending || isDislikePending) return;

    const action = isLikedByUser ? dislike : like;
    action({ id: commentId });
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

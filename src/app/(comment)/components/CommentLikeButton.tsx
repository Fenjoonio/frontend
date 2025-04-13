"use client";

import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import CommentLikersSheet from "./CommentLikersSheet";
import { sendGAEvent } from "@next/third-parties/google";
import { useDislikeComment, useLikeComment } from "@/services/comments";

type CommentLikeButtonProps = {
  commentId: number;
  likesCount: number;
  className?: string;
  isLikedByUser: boolean;
  showLikesCount?: boolean;
};

export default function CommentLikeButton({
  commentId,
  likesCount = 0,
  className,
  isLikedByUser,
  showLikesCount = true,
}: CommentLikeButtonProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLikedByUser);
  const [isLikersSheetOpen, setIsLikersSheetOpen] = useState(false);
  const { mutate: like, isPending: isLikePending } = useLikeComment(
    { id: commentId },
    {
      onSuccess: () => {
        setLocalIsLiked(true);
        sendGAEvent("event", "like_comment_click", { commentId });
      },
    }
  );
  const { mutate: dislike, isPending: isDislikePending } = useDislikeComment(
    { id: commentId },
    {
      onSuccess: () => {
        setLocalIsLiked(false);
        sendGAEvent("event", "dislike_comment_click", { commentId });
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

      <CommentLikersSheet
        commentId={commentId}
        isOpen={isLikersSheetOpen}
        onOpenChange={setIsLikersSheetOpen}
      />
    </>
  );
}

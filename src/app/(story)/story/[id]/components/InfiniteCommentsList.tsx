"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { MessagesSquareIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { sendGAEvent } from "@next/third-parties/google";
import { Comment, CommentSkeleton } from "@/components/Comment";
import CommentDialog from "@/app/(story)/components/CommentDialog";
import { STORIES_QUERY_KEYS, useGetInfiniteStoryComments } from "@/services/stories";

function CommentsEmptyState({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <MessagesSquareIcon width={56} height={56} className="text-soft-foreground" />
      <h4 className="font-bold mt-4">خبری از نقد نیست!</h4>
      <span className="text-sm text-soft-foreground mt-1">
        کسی این داستان رو نقد نکرده؛ تو اولین نفر باش
      </span>
    </div>
  );
}

type InfiniteCommentsListProps = {
  id: string;
};

export default function Comments({ id }: InfiniteCommentsListProps) {
  const queryClient = useQueryClient();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const { data, isPending, isFetching, isError } = useGetInfiniteStoryComments({ id });

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  const refetchCommentsList = () => {
    queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS, { id }] });
  };

  const openCommentDialog = () => {
    setIsCommentDialogOpen(true);
    sendGAEvent("open_comment_dialog", "click", { storyId: +id });
  };

  return (
    <section>
      <h3 className="text-sm text-soft-foreground">آخرین نقدها</h3>

      {!isFetching && !isError && comments.length === 0 && <CommentsEmptyState className="py-14" />}

      <div className="flex flex-col gap-y-2 mt-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            className="pb-6 not-first:pt-6 not-first:border-t border-border"
            onCommentEdit={refetchCommentsList}
            onCommentDelete={refetchCommentsList}
          />
        ))}

        {(isPending || isError) && (
          <>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <CommentSkeleton
                  key={index}
                  className="pb-6 not-first:pt-6 not-first:border-t border-border"
                />
              ))}
          </>
        )}
      </div>

      <Button variant="ghost" className="w-full mt-8" onClick={openCommentDialog}>
        اضافه کردن نقد جدید
      </Button>

      <CommentDialog id={id} isOpen={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen} />
    </section>
  );
}

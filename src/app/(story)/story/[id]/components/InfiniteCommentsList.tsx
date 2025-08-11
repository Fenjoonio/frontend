"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/classnames";
import { useQueryClient } from "@tanstack/react-query";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { Comment, CommentSkeleton } from "@/components/Comment";
import CommentDialog from "@/app/(story)/components/CommentDialog";
import { MessageSquareTextIcon, MessagesSquareIcon } from "lucide-react";
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
  className?: string;
};

export default function Comments({ id, className }: InfiniteCommentsListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthContext();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const { data, isFetching, isError, fetchNextPage, hasNextPage } = useGetInfiniteStoryComments({
    id,
  });

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.items ?? []) : [];
  }, [data?.pages]);

  const refetchCommentsList = () => {
    queryClient.invalidateQueries({ queryKey: [STORIES_QUERY_KEYS.GET_STORY_COMMENTS, { id }] });
  };

  const openCommentDialog = () => {
    if (!isLoggedIn) {
      router.push(`/accounts/login?redirect=/story/${id}`);
      return;
    }

    setIsCommentDialogOpen(true);
    sendGAEvent("event", "open_comment_dialog_click", { storyId: +id });
  };

  return (
    <section className={className}>
      <h2 className="text-sm">نقدها</h2>

      {!isFetching && !isError && comments.length === 0 && <CommentsEmptyState className="py-16" />}

      <InfiniteScroll
        next={fetchNextPage}
        dataLength={comments.length}
        hasMore={isFetching || hasNextPage}
        loader={
          <>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <CommentSkeleton key={index} className="flex gap-x-2 pb-6 not-first:pt-6" />
              ))}
          </>
        }
        className="divide-y divide-border mt-4"
      >
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            className="pb-6 not-first:pt-6"
            onCommentDelete={refetchCommentsList}
          />
        ))}
      </InfiniteScroll>

      <button
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
        className="fixed left-4 z-10 p-4 bg-primary text-light-gray-100 rounded-lg cursor-pointer"
        onClick={openCommentDialog}
      >
        <MessageSquareTextIcon className="size-5" />
      </button>

      <CommentDialog id={id} isOpen={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen} />
    </section>
  );
}

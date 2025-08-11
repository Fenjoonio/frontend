"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { MessagesSquareIcon } from "lucide-react";
import NovelCommentDialog from "./NovelCommentDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { useAuthContext } from "@/providers/AuthProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { Comment, CommentSkeleton } from "@/components/Comment";
import { NOVELS_QUERY_KEYS, useGetInfiniteNovelComments } from "@/services/novels";

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

type NovelCommentsProps = {
  className?: string;
};

export default function NovelComments({ className }: NovelCommentsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthContext();
  const params = useParams<{ id: string }>();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const { data, isFetching, isError, fetchNextPage, hasNextPage } = useGetInfiniteNovelComments({
    id: +params.id,
  });

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.items ?? []) : [];
  }, [data?.pages]);

  const refetchCommentsList = () => {
    queryClient.invalidateQueries({
      queryKey: [NOVELS_QUERY_KEYS.GET_NOVEL_COMMENTS, { id: +params.id }],
    });
  };

  const openCommentDialog = () => {
    if (!isLoggedIn) {
      router.push(`/accounts/login?redirect=/novel/${params.id}`);
      return;
    }

    setIsCommentDialogOpen(true);
    sendGAEvent("event", "open_comment_dialog_click", { novelId: +params.id });
  };

  return (
    <section className={className}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-soft-foreground">آخرین نقدها</h3>
        <Button variant="link" className="p-0 h-auto" onClick={openCommentDialog}>
          ثبت نقد جدید
        </Button>
      </div>

      {!isFetching && !isError && comments.length === 0 && <CommentsEmptyState className="py-24" />}

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

      <NovelCommentDialog
        id={params.id}
        isOpen={isCommentDialogOpen}
        onOpenChange={setIsCommentDialogOpen}
      />
    </section>
  );
}

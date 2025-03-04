"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/utils/users";
import UserAvatar from "@/components/UserAvatar";
import { MessagesSquareIcon } from "lucide-react";
import type { Comment } from "@/services/stories";
import { formatStoryCreateAt } from "@/lib/utils/story";
import { useGetInfiniteStoryComments } from "@/services/stories";
import CommentSheet from "@/app/(story)/components/CommentSheet";

type CommentProps = {
  comment: Comment;
};

function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-x-2 pb-6 not-first:pt-6 not-first:border-t border-[#505050]">
      <UserAvatar user={comment.user} />

      <div>
        <div className="flex gap-x-2 items-center">
          <span className="font-bold">{getUserName(comment.user)}</span>
          <span className="w-1 h-1 bg-[#505050] rounded-sm"></span>
          <span className="text-[10px] text-[#B0B0B0]">
            {formatStoryCreateAt(comment.createdAt)}
          </span>
        </div>

        <p className="w-full text-sm text-[#B0B0B0] whitespace-pre-line line-clamp-6 leading-6 mt-1">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex gap-x-2 pb-6 not-first:pt-6 not-first:border-t border-[#505050]">
      <div>
        <div className="w-7 h-7 bg-[#505050] opacity-40 rounded-lg animate-pulse"></div>
      </div>

      <div className="flex-1 mt-1">
        <div className="w-20 h-4 bg-[#505050] opacity-40 rounded-full animate-pulse"></div>
        <div className="w-[50%] h-4 bg-[#505050] opacity-20 rounded-full animate-pulse mt-4"></div>
      </div>
    </div>
  );
}

function CommentsEmptyState({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <MessagesSquareIcon width={56} height={56} className="text-[#B0B0B0]" />
      <h4 className="font-bold mt-4">خبری از نقد نیست!</h4>
      <span className="text-sm text-[#B0B0B0] mt-1">
        کسی این داستان رو نقد نکرده؛ تو اولین نفر باش
      </span>
    </div>
  );
}

type InfiniteCommentsListProps = {
  id: string;
};

export default function Comments({ id }: InfiniteCommentsListProps) {
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const { data, isPending, isFetching, isError } = useGetInfiniteStoryComments({ id });

  const comments = useMemo<Comment[]>(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  return (
    <section className="">
      <h3 className="text-sm text-[#B0B0B0]">آخرین نقدها</h3>

      {!isFetching && !isError && comments.length === 0 && <CommentsEmptyState className="py-14" />}

      <div className="flex flex-col gap-y-2 mt-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

        {(isPending || isError) && (
          <>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
          </>
        )}
      </div>

      <Button variant="ghost" className="w-full mt-8" onClick={() => setIsCommentSheetOpen(true)}>
        اضافه کردن نقد جدید
      </Button>

      <CommentSheet id={id} isOpen={isCommentSheetOpen} onOpenChange={setIsCommentSheetOpen} />
    </section>
  );
}

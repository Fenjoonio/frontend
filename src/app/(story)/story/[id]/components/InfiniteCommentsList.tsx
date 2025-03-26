"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { MessagesSquareIcon } from "lucide-react";
import { Comment, CommentSkeleton } from "@/components/Comment";
import { useGetInfiniteStoryComments } from "@/services/stories";
import CommentSheet from "@/app/(story)/components/CommentSheet";

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

  const comments = useMemo(() => {
    return data?.pages ? data.pages.flatMap((page) => page.comments ?? []) : [];
  }, [data?.pages]);

  return (
    <section>
      <h3 className="text-sm text-[#B0B0B0]">آخرین نقدها</h3>

      {!isFetching && !isError && comments.length === 0 && <CommentsEmptyState className="py-14" />}

      <div className="flex flex-col gap-y-2 mt-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            className="pb-6 not-first:pt-6 not-first:border-t border-[#505050]"
          />
        ))}

        {(isPending || isError) && (
          <>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <CommentSkeleton
                  key={index}
                  className="pb-6 not-first:pt-6 not-first:border-t border-[#505050]"
                />
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
